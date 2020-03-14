'use strict';

var React = require('react');
var assign = require('lodash.assign');
var isPlainObject = require('lodash.isplainobject');
var xssFilters = require('xss-filters');
var pascalCase = require('pascalcase');

var typeAliases = {
    blockquote: 'block_quote',
    thematicbreak: 'thematic_break',
    htmlblock: 'html_block',
    htmlinline: 'html_inline',
    codeblock: 'code_block',
    hardbreak: 'linebreak',
    atmention: 'at_mention',
    editedindicator: 'edited_indicator',
    tableRow: 'table_row',
    tableCell: 'table_cell'
};

var defaultRenderers = {
    block_quote: 'blockquote', // eslint-disable-line camelcase
    emph: 'em',
    linebreak: 'br',
    image: 'img',
    item: 'li',
    link: 'a',
    paragraph: 'p',
    strong: 'strong',
    del: 'del',
    thematic_break: 'hr', // eslint-disable-line camelcase

    html_block: HtmlRenderer, // eslint-disable-line camelcase
    html_inline: HtmlRenderer, // eslint-disable-line camelcase

    list: function List(props) {
        var tag = props.type.toLowerCase() === 'bullet' ? 'ul' : 'ol';
        var attrs = getCoreProps(props);

        if (props.start !== null && props.start !== 1) {
            attrs.start = props.start.toString();
        }

        return createElement(tag, attrs, props.children);
    },
    code_block: function CodeBlock(props) { // eslint-disable-line camelcase
        var className = props.language && 'language-' + props.language;
        var code = createElement('code', { className: className }, props.literal);
        return createElement('pre', getCoreProps(props), code);
    },
    code: function Code(props) {
        return createElement('code', getCoreProps(props), props.children);
    },
    heading: function Heading(props) {
        return createElement('h' + props.level, getCoreProps(props), props.children);
    },

    text: null,
    softbreak: null,

    at_mention: function AtMention(props) {
        var newProps = getCoreProps(props);
        if (props.username) {
            props['data-mention-name'] = props.username;
        }

        return createElement('span', newProps, props.children);
    },
    emoji: function Emoji(props) {
        var newProps = getCoreProps(props);
        if (props.emojiName) {
            props['data-emoji-name'] = props.emojiName;
        }

        return createElement('span', newProps, props.children);
    },
    edited_indicator: null,
    hashtag: function Hashtag(props) {
        var newProps = getCoreProps(props);
        if (props.hashtag) {
            props['data-hashtag'] = props.hashtag;
        }

        return createElement('span', newProps, props.children);
    },
    mention_highlight: function MentionHighlight(props) {
        var newProps = getCoreProps(props);
        newProps['data-mention-highlight'] = 'true';
        return createElement('span', newProps, props.children);
    },
    search_highlight: function SearchHighlight(props) {
        var newProps = getCoreProps(props);
        newProps['data-search-highlight'] = 'true';
        return createElement('span', newProps, props.children);
    },

    table: function Table(props) {
        var childrenArray = React.Children.toArray(props.children);

        var children = [createElement('thead', {'key': 'thead'}, childrenArray.slice(0, 1))];
        if (childrenArray.length > 1) {
            children.push(createElement('tbody', {'key': 'tbody'}, childrenArray.slice(1)));
        }

        return createElement('table', getCoreProps(props), children);
    },
    table_row: 'tr',
    table_cell: function TableCell(props) {
        var newProps = getCoreProps(props);
        if (props.align) {
            newProps.className = 'align-' + props.align;
        }

        return createElement('td', newProps, props.children);
    }
};

var coreTypes = Object.keys(defaultRenderers);

function getCoreProps(props) {
    return {
        'key': props.nodeKey,
        'className': props.className,
        'data-sourcepos': props['data-sourcepos']
    };
}

function normalizeTypeName(typeName) {
    var norm = typeName.toLowerCase();
    var type = typeAliases[norm] || norm;
    return typeof defaultRenderers[type] !== 'undefined' ? type : typeName;
}

function normalizeRenderers(renderers) {
    return Object.keys(renderers || {}).reduce(function(normalized, type) {
        var norm = normalizeTypeName(type);
        normalized[norm] = renderers[type];
        return normalized;
    }, {});
}

function HtmlRenderer(props) {
    var coreProps = getCoreProps(props);
    var nodeProps = props.escapeHtml ? {} : { dangerouslySetInnerHTML: { __html: props.literal } };
    var children = props.escapeHtml ? [props.literal] : null;

    if (props.escapeHtml || !props.skipHtml) {
        var actualProps = assign(coreProps, nodeProps);
        return createElement(props.isBlock ? 'div' : 'span', actualProps, children);
    }
}

function isGrandChildOfList(node) {
    var grandparent = node.parent.parent;
    return (
        grandparent &&
        grandparent.type.toLowerCase() === 'list' &&
        grandparent.listTight
    );
}

function addChild(node, child) {
    var parent = node;
    do {
        parent = parent.parent;
    } while (!parent.react);

    parent.react.children.push(child);
}

function createElement(tagName, props, children) {
    var nodeChildren = Array.isArray(children) && children.reduce(reduceChildren, []);
    var args = [tagName, props].concat(nodeChildren || children);
    return React.createElement.apply(React, args);
}

function reduceChildren(children, child) {
    var lastIndex = children.length - 1;
    if (typeof child === 'string' && typeof children[lastIndex] === 'string') {
        children[lastIndex] += child;
    } else {
        children.push(child);
    }

    return children;
}

function flattenPosition(pos) {
    return [
        pos[0][0], ':', pos[0][1], '-',
        pos[1][0], ':', pos[1][1]
    ].map(String).join('');
}

// For some nodes, we want to include more props than for others
function getNodeProps(node, key, opts, renderer, context) {
    var props = { key: key }, undef;

    // `sourcePos` is true if the user wants source information (line/column info from markdown source)
    if (opts.sourcePos && node.sourcepos) {
        props['data-sourcepos'] = flattenPosition(node.sourcepos);
    }

    var type = normalizeTypeName(node.type);

    switch (type) {
        case 'html_inline':
        case 'html_block':
            props.isBlock = type === 'html_block';
            props.escapeHtml = opts.escapeHtml;
            props.skipHtml = opts.skipHtml;
            break;
        case 'code_block':
            var codeInfo = node.info ? node.info.split(/ +/) : [];
            if (codeInfo.length > 0 && codeInfo[0].length > 0) {
                props.language = codeInfo[0];
                props.codeinfo = codeInfo;
            }
            break;
        case 'code':
            props.children = node.literal;
            props.inline = true;
            break;
        case 'heading':
            props.level = node.level;
            break;
        case 'softbreak':
            props.softBreak = opts.softBreak;
            break;
        case 'link':
            props.href = opts.transformLinkUri ? opts.transformLinkUri(node.destination) : node.destination;
            props.title = node.title || undef;
            if (opts.linkTarget) {
                props.target = opts.linkTarget;
            }
            break;
        case 'image':
            props.src = opts.transformImageUri ? opts.transformImageUri(node.destination) : node.destination;
            props.title = node.title || undef;

            // Commonmark treats image description as children. We just want the text
            props.alt = node.react.children.join('');
            break;
        case 'list':
            props.start = node.listStart;
            props.type = node.listType;
            props.tight = node.listTight;
            break;
        case 'at_mention':
            props.mentionName = node.mentionName;
            break;
        case 'emoji':
            props.emojiName = node.emojiName;
            props.literal = node.literal;
            break;
        case 'hashtag':
            props.hashtag = node.hashtag;
            break;
        case 'paragraph':
            props.first = !(node._prev && node._prev.type === 'paragraph');
            props.last = !(node._next && node._next.type === 'paragraph');
            break;
        case 'edited_indicator':
            break;
        case 'table':
            props.numRows = countRows(node);
            props.numColumns = countColumns(node);
            break;
        case 'table_row':
            props.isHeading = node.isHeading;
            break;
        case 'table_cell':
            props.isHeading = node.isHeading;
            props.align = node.align;
            break;
        default:
    }

    if (opts.getExtraPropsForNode) {
        props = Object.assign(props, opts.getExtraPropsForNode(node));
    }

    if (typeof renderer !== 'string') {
        props.literal = node.literal;
    }

    var children = props.children || (node.react && node.react.children);
    if (Array.isArray(children)) {
        props.children = children.reduce(reduceChildren, []) || null;
    }

    props.context = context.slice();

    return props;
}

function countChildren(node) {
    var count = 0;

    for (var child = node.firstChild; child; child = child.next) {
        count += 1;
    }

    return count;
}

function countRows(table) {
    return countChildren(table);
}

function countColumns(table) {
    return countChildren(table.firstChild);
}

function getPosition(node) {
    if (!node) {
        return null;
    }

    if (node.sourcepos) {
        return flattenPosition(node.sourcepos);
    }

    return getPosition(node.parent);
}

function renderNodes(block) {
    var walker = block.walker();

    // Softbreaks are usually treated as newlines, but in HTML we might want explicit linebreaks
    var softBreak = (
        this.softBreak === 'br' ?
        React.createElement('br') :
        this.softBreak
    );

    var propOptions = {
        sourcePos: this.sourcePos,
        escapeHtml: this.escapeHtml,
        skipHtml: this.skipHtml,
        transformLinkUri: this.transformLinkUri,
        transformImageUri: this.transformImageUri,
        softBreak: softBreak,
        linkTarget: this.linkTarget,
        getExtraPropsForNode: this.getExtraPropsForNode
    };

    var e;
    var doc;
    var context = [];
    var index = 0;
    while ((e = walker.next())) {
        var key = String(index);
        index += 1;

        var entering = e.entering;
        var leaving = !entering;
        var node = e.node;
        var type = normalizeTypeName(node.type);
        var nodeProps = null;

        // If we have not assigned a document yet, assume the current node is just that
        if (!doc) {
            doc = node;
            node.react = { children: [] };
            continue;
        } else if (node === doc) {
            // When we're leaving...
            continue;
        }

        // In HTML, we don't want paragraphs inside of list items
        if (!this.renderParagraphsInLists && type === 'paragraph' && isGrandChildOfList(node)) {
            continue;
        }

        // If we're skipping HTML nodes, don't keep processing
        if (this.skipHtml && (type === 'html_block' || type === 'html_inline')) {
            continue;
        }

        var isDocument = node === doc;
        var disallowedByConfig = this.allowedTypes.indexOf(type) === -1;
        var disallowedByUser = false;

        // Do we have a user-defined function?
        var isCompleteParent = node.isContainer && leaving;
        var renderer = this.renderers[type];
        if (this.allowNode && (isCompleteParent || !node.isContainer)) {
            var nodeChildren = isCompleteParent ? node.react.children : [];

            nodeProps = getNodeProps(node, key, propOptions, renderer, context);
            disallowedByUser = !this.allowNode({
                type: pascalCase(type),
                renderer: this.renderers[type],
                props: nodeProps,
                children: nodeChildren
            });
        }

        if (node.isContainer) {
            var contextType = node.type;
            if (node.level) {
                contextType = node.type + node.level;
            } else if (node.type === 'table_row' && node.parent.firstChild === node) {
                contextType = 'table_header_row';
            } else {
                contextType = node.type;
            }

            if (entering) {
                context.push(contextType);
            } else {
                var popped = context.pop();

                if (!popped) {
                    throw new Error('Attempted to pop empty stack');
                } else if (!popped === contextType) {
                    throw new Error('Popped context of type `' + pascalCase(popped) +
                        '` when expecting context of type `' + pascalCase(contextType) + '`');
                }
            }
        }

        if (!isDocument && (disallowedByUser || disallowedByConfig)) {
            if (!this.unwrapDisallowed && entering && node.isContainer) {
                walker.resumeAt(node, false);
            }

            continue;
        }

        var isSimpleNode = type === 'text' || type === 'softbreak';
        if (typeof renderer !== 'function' && !isSimpleNode && typeof renderer !== 'string') {
            throw new Error(
                'Renderer for type `' + pascalCase(node.type) + '` not defined or is not renderable'
            );
        }

        if (context.length > this.maxDepth) {
            // Do nothing, we should not regularly be nested this deeply and we don't want to cause React to
            // overflow the stack
        } else if (node.isContainer && entering) {
            node.react = {
                component: renderer,
                props: {},
                children: []
            };
        } else {
            var childProps = nodeProps || getNodeProps(node, key, propOptions, renderer, context);
            if (renderer === ReactRenderer.forwardChildren) {
                for (var i = 0; i < childProps.children.length; i++) {
                    var child = childProps.children[i];
                    addChild(node, child);
                }
            } else if (renderer) {
                childProps = typeof renderer === 'string'
                    ? childProps
                    : assign(childProps, {nodeKey: childProps.key});

                addChild(node, React.createElement(renderer, childProps));
            } else if (type === 'text') {
                addChild(node, node.literal);
            } else if (type === 'softbreak') {
                addChild(node, softBreak);
            }
        }
    }

    if (context.length !== 0) {
        throw new Error('Expected context to be empty after rendering, but has `' + context.join(', ') + '`');
    }

    return doc.react.children;
}

function defaultLinkUriFilter(uri) {
    var url = uri.replace(/file:\/\//g, 'x-file://');

    // React does a pretty swell job of escaping attributes,
    // so to prevent double-escaping, we need to decode
    return decodeURI(xssFilters.uriInDoubleQuotedAttr(url));
}

function ReactRenderer(options) {
    var opts = options || {};

    if (opts.allowedTypes && opts.disallowedTypes) {
        throw new Error('Only one of `allowedTypes` and `disallowedTypes` should be defined');
    }

    if (opts.allowedTypes && !Array.isArray(opts.allowedTypes)) {
        throw new Error('`allowedTypes` must be an array');
    }

    if (opts.disallowedTypes && !Array.isArray(opts.disallowedTypes)) {
        throw new Error('`disallowedTypes` must be an array');
    }

    if (opts.allowNode && typeof opts.allowNode !== 'function') {
        throw new Error('`allowNode` must be a function');
    }

    var linkFilter = opts.transformLinkUri;
    if (typeof linkFilter === 'undefined') {
        linkFilter = defaultLinkUriFilter;
    } else if (linkFilter && typeof linkFilter !== 'function') {
        throw new Error('`transformLinkUri` must either be a function, or `null` to disable');
    }

    var imageFilter = opts.transformImageUri;
    if (typeof imageFilter !== 'undefined' && typeof imageFilter !== 'function') {
        throw new Error('`transformImageUri` must be a function');
    }

    if (opts.renderers && !isPlainObject(opts.renderers)) {
        throw new Error('`renderers` must be a plain object of `Type`: `Renderer` pairs');
    }

    var allowedTypes = (opts.allowedTypes && opts.allowedTypes.map(normalizeTypeName)) || coreTypes;
    if (opts.disallowedTypes) {
        var disallowed = opts.disallowedTypes.map(normalizeTypeName);
        allowedTypes = allowedTypes.filter(function filterDisallowed(type) {
            return disallowed.indexOf(type) === -1;
        });
    }

    return {
        sourcePos: Boolean(opts.sourcePos),
        softBreak: opts.softBreak || '\n',
        renderers: assign({}, defaultRenderers, normalizeRenderers(opts.renderers)),
        escapeHtml: Boolean(opts.escapeHtml),
        skipHtml: Boolean(opts.skipHtml),
        renderParagraphsInLists: Boolean(opts.renderParagraphsInLists),
        transformLinkUri: linkFilter,
        transformImageUri: imageFilter,
        allowNode: opts.allowNode,
        allowedTypes: allowedTypes,
        unwrapDisallowed: Boolean(opts.unwrapDisallowed),
        render: renderNodes,
        linkTarget: opts.linkTarget || false,
        maxDepth: opts.maxDepth || 30,
        getExtraPropsForNode: opts.getExtraPropsForNode
    };
}

function forwardChildren(props) {
    return props.children;
}

ReactRenderer.uriTransformer = defaultLinkUriFilter;
ReactRenderer.types = coreTypes.map(pascalCase);
ReactRenderer.renderers = coreTypes.reduce(function(renderers, type) {
    renderers[pascalCase(type)] = defaultRenderers[type];
    return renderers;
}, {});
ReactRenderer.countRows = countRows;
ReactRenderer.countColumns = countColumns;
ReactRenderer.forwardChildren = forwardChildren;

module.exports = ReactRenderer;
