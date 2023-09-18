module.exports = grammar({
  name: 'Chainsaw',

  rules: {
   source_file: $ => repeat($._definition),

    _definition: $ => choice(
      $.variable_declaration,
      $.include_statement,
      $.main_function,
      $.function_definition
    ),

    variable_declaration: $ => choise(
      seq(
        $.identifier,
        ':',
        $.type
      ),
      seq(
        $.identifier,
        ':',
        $.type,
        '=',
        $._expression
      )
    )

    main_function: $ => seq(
      'main',
      ':',
      $.type,
      $.parameter_list,
      $.block
    ),

    function_definition: $ => seq(
      $.identifier,
      ':',
      $._type,
      $.parameter_list,
      $.block
    ),

    parameter_list: $ => seq(
      '[',
       // TODO: parameters
      ']'
    ),

    _type: $ => choice(
      'bool'
      'void'
      'number'
      // TODO: other kinds of types
    ),

    block: $ => seq(
      '{',
      repeat($._statement),
      '}'
    ),

    _statement: $ => choice(
      $.return_statement
      // TODO: other kinds of statements
    ),

    return_statement: $ => seq(
      'return',
      $._expression,
      ';'
    ),

    _expression: $ => choice(
      $.identifier,
      $.number,
      $.string,
      $.float
      // TODO: other kinds of expressions
    ),

    identifier: $ => /[a-z]+/,

    number: $ => /[-+]?\b\d+\b/,

    string: $ => /"[^"]*"/,

    float: $ => /[-+]?((\b[0-9]+)?\.)?\b[0-9]+([eE][-+]?[0-9]+)?\b/
  }
});
