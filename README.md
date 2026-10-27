# Augment Yutnori Online — player-color and piece movement visibility fix

## Files to update on GitHub
- `server.js`
- `public/index.html`

Keep `package.json`, `package-lock.json`, and `public/augment-picker.html` as they are.

## Changes
- Player colors are assigned in turn order: 1 blue, 2 red, 3 yellow, 4 green, then purple/orange/cyan/white.
- Board pieces are larger and the current player's movable pieces glow after a result is selected.
- Player piece dots use their player's unique color.
- `game:choose-result` and `game:move` acknowledgements include the authoritative server state. The client applies that state immediately after a successful action so the visible board does not depend on the order in which the Socket.IO acknowledgement and broadcast arrive.

JavaScript syntax checked. The app has not been verified in a live Render multiplayer session.
