<?php

$finder = PhpCsFixer\Finder::create()
    ->in([
        __DIR__ . '/src',
        __DIR__ . '/tests',
        __DIR__ . '/database',
        __DIR__ . '/config',
        __DIR__ . '/routes'
    ]);

return (new PhpCsFixer\Config())
    ->setRules([
        // PSR 1 and 2 standards
        '@PSR2' => true,

        // Each line of multi-line DocComments must have an asterisk [PSR-5] and must be aligned with the first one.
        'align_multiline_comment' => ['comment_type' => 'all_multiline'],

        // Each element of an array must be indented exactly once.
        'array_indentation' => true,

        // Arrays must be defined using the short syntax [] rather than the long syntax array()
        'array_syntax' => ['syntax' => 'short'],

        // Ensure there is no code on the same line as the PHP open tag and it is followed by a blank line.
        'blank_line_after_opening_tag' => true,

        // An empty line feed must precede any configured statement (foreach, continue, yield etc).
        'blank_line_before_statement' => true,

        // A single space should be between cast and variable.
        'cast_spaces' => ['space' => 'single'],

        // The PHP constants true, false, and null must be written using lowercase.
        'constant_case' => ['case' => 'lower'],

        // There should be a single space between each concatenation
        'concat_space' => ['spacing' => 'one'],

        // Transforms imported FQCN parameters and return types in function arguments to short version.
        'fully_qualified_strict_types' => true,

        // Class static references self, static and parent MUST be in lower case.
        'lowercase_static_reference' => true,

        //
        'magic_method_casing' => true,

        // Magic method definitions and calls must be using the correct casing.
        'magic_constant_casing' => true,

        // Leave only one space after a method argument comma, and if the signature is multiline ensure all parameters are multiline
        'method_argument_space' => ['keep_multiple_spaces_after_comma' => false, 'on_multiline' => 'ensure_fully_multiline'],

        // Method chaining MUST be properly indented
        'method_chaining_indentation' => true,

        // Ensure multiline comments are either /** or /*
        'multiline_comment_opening_closing' => true,

        // Native functions should be lower case
        'native_function_casing' => true,

        // All instances created with new keyword must be followed by braces.
        'new_with_braces' => true,

        // Native type hints for functions should use the correct case.
        'native_function_type_declaration_casing' => true,

        // here should not be blank lines between docblock and the documented element.
        'no_blank_lines_after_phpdoc' => true,

        // The closing tag MUST be omitted from files containing only PHP.
        'no_closing_tag' => true,

        // There should not be any empty comments.
        'no_empty_comment' => true,

        // There should not be empty PHPDoc blocks.
        'no_empty_phpdoc' => true,

        // Remove useless (semicolon) statements.
        'no_empty_statement' => true,

        // Unused use statements must be removed.
        'no_unused_imports' => true,

        // There should not be useless else cases.
        'no_useless_else' => true,

        // There should not be an empty return statement at the end of a function.
        'no_useless_return' => true,

        // Imports must be ordered alphabetically
        'ordered_imports' => ['sort_algorithm' => 'alpha'],

        // Enforce snake case for PHPUnit test methods, following configuration.
        'php_unit_method_casing' => ['case' => 'snake_case'],

        // PHPDoc should contain @param for all params.
        'phpdoc_add_missing_param_annotation' => true,

        // Docblocks should have the same indentation as the documented subject.
        'phpdoc_indent' => true,

        // @return void and @return null annotations should be omitted from PHPDoc.
        'phpdoc_no_empty_return' => true,

        // @package and @subpackage annotations should be omitted from PHPDoc.
        'phpdoc_no_package' => true,

        // Order phpdoc tags by value.
        'phpdoc_order' => true,

        // PHPDoc summary should end in either a full stop, exclamation mark, or question mark.
        'phpdoc_summary' => true,

        // There should be no space before colon, and one space after it in return type declarations
        'return_type_declaration' => ['space_before' => 'none'],

        // There MUST be one use keyword per declaration.
        'single_import_per_statement' => true,

        // Convert single line comments using a hash to use //
        'single_line_comment_style' => ['comment_types' => ['hash']],

        // Convert double quotes to single quotes for simple strings.
        'single_quote' => true,

        // Use null coalescing operator ?? where possible. Requires PHP >= 7.0.
        'ternary_to_null_coalescing' => true,

        // Multi-line arrays must have a trailing comma.
        'trailing_comma_in_multiline' => ['elements' => ['arrays']]
    ])
    ->setFinder($finder);
