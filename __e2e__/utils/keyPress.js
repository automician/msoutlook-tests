import { shared } from '../shared'

export const press = async key => {
  const driver = shared.wdioDriver
  await driver.executeScript('windows: keys', [
    {
      actions: [
        { virtualKeyCode: key, down: true },
        { virtualKeyCode: key, down: false },
      ],
    },
  ])
}

export const keys = {
  LeftMouse: 0x01,
  RightMouse: 0x02,
  MiddleMouse: 0x04,
  BACKSPACE: 0x08,
  TAB: 0x09,
  ENTER: 0x0d,
  SHIFT: 0x10,
  CONTROL: 0x11,
  ALT: 0x12,
  PAUSE: 0x13,
  CAPS: 0x14,
  ESCAPE: 0x1b,
  SPACE: 0x20,
  PAGEUP: 0x21,
  PAGEDOWN: 0x22,
  END: 0x23,
  HOME: 0x24,
  LEFTARROW: 0x25,
  UPARROW: 0x26,
  RIGHTARROW: 0x27,
  DOWNARROW: 0x28,
  SELECT: 0x29,
  PRINT: 0x2a,
  PRINTSCREEN: 0x2c,
  INSERT: 0x2d,
  DELETE: 0x2e,
  LWIN: 0x5b,
  RWIN: 0x5c,
  F1: 0x70,
  F2: 0x71,
  F3: 0x72,
  F4: 0x73,
  F5: 0x74,
  F6: 0x75,
  F7: 0x76,
  F8: 0x77,
  F9: 0x78,
  F10: 0x79,
  F11: 0x7a,
  F12: 0x7b,
  NUMLOCK: 0x90,
  SCROLL: 0x91,
  LSHIFT: 0xa0,
  RSHIFT: 0xa1,
  LCONTROL: 0xa2,
  RCONTROL: 0xa3,
  LMENU: 0xa4,
  RMENU: 0xa5,
}
