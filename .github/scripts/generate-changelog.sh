#!/bin/bash
# This script creates a regex string based on the passed package
# in order to generate a changelog that filters out the other
# packages in this monorepo.

# Check if 'packages', 'current_package' and 'token' are provided as command line arguments
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <current_package> <token>"
    exit 1
fi

# Assign command line arguments to variables
packages=("components" "tokens")
current_package="$1"
token="$2"

# Filter out current package
filtered_array=()
for value in "${packages[@]}"
do
    [[ $value != $current_package ]] && filtered_array+=($value)
done

# Add regex to each item in array
filtered_array=( "${filtered_array[@]/%/-.*}" )

# Join strings with pipe char
joined_string=$(IFS="|"; echo "${filtered_array[*]}")

# Build full regex string
regex="(.*-(alpha|beta).*|$joined_string)"
echo "Regex: $regex"

bundle exec github_changelog_generator -u department-of-veterans-affairs -p va-mobile-library -t $token --exclude-tags-regex $regex --no-unreleased
