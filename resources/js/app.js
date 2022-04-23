import '../css/app.css'
import { createApp, reactive } from 'petite-vue'
import { interpret } from 'xstate'
import { gameMachine } from './game-machine'

const gameService = interpret(gameMachine)

const game = reactive({
  state: gameMachine.initialState,
  send(event) {
    gameService.send(event)
  },
})

gameService
  .onTransition((state) => {
    game.state = state
  })
  .start()

createApp({
  game,
}).mount()
