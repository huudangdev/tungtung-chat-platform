
#import "RootView.h"

@implementation RootView

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(setColor:(float)red green:(float)green blue:(float)blue alpha:(float)alpha)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
        rootViewController.view.backgroundColor = [[UIColor alloc] initWithRed:red/255 green:green/255 blue:blue/255 alpha:alpha];
    });
}

@end
  
