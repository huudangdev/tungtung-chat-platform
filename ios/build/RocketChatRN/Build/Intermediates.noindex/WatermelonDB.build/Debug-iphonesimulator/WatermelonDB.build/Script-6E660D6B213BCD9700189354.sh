#!/bin/sh
target_dir=${BUILT_PRODUCTS_DIR}/include/${PRODUCT_MODULE_NAME}/

# Ensure the target include path exists
mkdir -p ${target_dir}

# Copy any file that looks like a Swift generated header to the include path
cp ${DERIVED_SOURCES_DIR}/*-Swift.h ${target_dir}
