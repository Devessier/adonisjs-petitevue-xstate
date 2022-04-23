import { assign, createMachine } from 'xstate'

export const gameMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAUwBcCWawAIoEMBbMAOgHEwA7MAJ300qjyLAGJFQAHAe1iw26UOIAB6IAtAEYAzAAYSAFhkAmAGyTlmgKwKAHABoQAT0RblAdhKqAnKt0yZ92eoC+Lw6kzZmxEsgA2+EYYjKwAstwAbrgArpzCPHyYgsJiCJqW5tJKCraqWua6qgpahiYI0nKKsuZZ5qr12TVuHuhYuAS+AUEhUOFRuBDcAO5CSCCJ-CnjaWqqJJUKTeayytbStgpliDYKJMqSCsp6kpLOuuZaLSCe7T6k3cGhEdE4-mAAZmgJvFNjoGkpMotIppOpnA0lHYCtt0ro9motNYtHJUbppMprrdvJ0HoEnn0XrgaBgoAALb7jSbJf6iUzmawkazwuzmGSyJZI2FaSSMg4aOQlWRaMyqLFtHEsPz43rsKm-GmpCSqeZ2ay2XQi8x6BnWWFZXQkXS2LKSHQKS7q8VeDpSgDqgnurAAymh8DQ0Dh8DhqMN7j8kgJaYC5JIjdqiusFPlobDdMpDYs5AyFMKkVdrpRuBA4MJsbbfBRqHQGExcQG-kqEOIjob0wojiLdMaLNyRSRJPHkRoGcUeda7rjpT1GBXFTNENYw85zJpZBpkSV6m2QZ21sVpJr1moB5LfA7KP75YHpgDEAz9qpVhrZOqu6VjJPmyRZKtZNICvHN+ZdwWwGOgyrGszBIetGy0ZtrFbR90lOfYVi0dR7GZBNlGkNw3CAA */
  createMachine(
    {
      context: {
        x: 0,
        y: 0,
        goal: { x: -1, y: -1 },
        winsCount: 0,
      },
      id: 'Petite game',
      initial: 'Generating game',
      states: {
        'Generating game': {
          always: {
            actions: ['Reset x and y', 'Generate goal'],
            target: 'Playing',
          },
        },
        'Playing': {
          always: {
            actions: 'Increment wins count',
            cond: 'Reached goal',
            target: 'Won game',
          },
          on: {
            'Move up': {
              actions: 'Move piece up',
              cond: 'Can move piece up',
            },
            'Move down': {
              actions: 'Move piece down',
              cond: 'Can move piece down',
            },
            'Move left': {
              actions: 'Move piece left',
              cond: 'Can move piece left',
            },
            'Move right': {
              actions: 'Move piece right',
              cond: 'Can move piece right',
            },
          },
        },
        'Won game': {
          on: {
            'Start a new game': {
              target: 'Generating game',
            },
          },
        },
      },
    },
    {
      guards: {
        'Reached goal': (context) => context.x === context.goal.x && context.y === context.goal.y,
        'Can move piece up': (context) => context.y > 0,
        'Can move piece down': (context) => context.y < 9,
        'Can move piece left': (context) => context.x > 0,
        'Can move piece right': (context) => context.x < 9,
      },
      actions: {
        'Reset x and y': assign({ x: 0, y: 0 }),
        'Generate goal': assign({
          goal: () => ({
            // We prevent (0, 0) to be the goal as it's the starting position.
            x: generateRandomIntBetween(1, 9),
            y: generateRandomIntBetween(1, 9),
          }),
        }),
        'Move piece up': assign({
          y: (context) => context.y - 1,
        }),
        'Move piece down': assign({
          y: (context) => context.y + 1,
        }),
        'Move piece left': assign({
          x: (context) => context.x - 1,
        }),
        'Move piece right': assign({
          x: (context) => context.x + 1,
        }),
        'Increment wins count': assign({
          winsCount: (context) => context.winsCount + 1,
        }),
      },
    }
  )

function generateRandomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
