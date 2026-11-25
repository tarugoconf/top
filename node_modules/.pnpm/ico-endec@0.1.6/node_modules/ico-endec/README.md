# ICO encoder & decoder
This JavaScript library provides an encoder and decoder for ICO and CUR files. Although this library can encode and decode both BMP and PNG images, BMP endec does not provide bitmasking support, and as such, will not work with some icons. However, PNG support is widespread and has become a more defacto standard for application icons, so this problem is largely moot -- but it still would be nice to have.

## Encoding
### icoEndec.encode([Buffer||ArrayBuffer])
The encode function takes an array of ArrayBuffers or Buffers that contain BMP or PNG data. It returns a Buffer containing the binary data of the ICO file.

#### Example
```
const icoEndec   = require('ico-endec')
const fsPromises = require('fs').Promises

(async () => {
  let icoBuffer = icoEndec.encode([
    await fsPromises.readFile('myIcon-16x16.png'),
    await fsPromises.readFile('myIcon-32x32.png'),
    await fsPromises.readFile('myIcon-64x64.png')
  ])
  
  await fsPromises.writeFile('myIcon.ico', icoBuffer)
})()
```

## Decoding
### icoEndec.decode(Buffer)
The decode function takes a Buffer or an ArrayBuffer that holds the binary data of an ICO file. It returns an array of [IconEntries](#iconentry).
#### Example
```
const icoEndec   = require('ico-endec')
const fsPromises = require('fs').Promises

(async () => {
  let icons = icoEndec.decode(await fsPromises.readFile('myIcon.ico'))
  
  icons.forEach((icon, index) => {
    fsPromises.writeFile(`myIcon-${icon.width}x${icon.height}.${icon.imageType}`, icon.imageData)
  })
})()
```

## IconEntry
The IconEntry class stores various information about the given icon entry.

| Accessor              | Type | Description |
|-|-|-|
| width                 | Number | width of the image, maximum of 256
| height                | Number | height of the image, maximum of 256
| colors                | Number | number of colors
| colorPlanes           | Number | color planes of an ICO image
| bitsPerPixel          | Number | bits per pixel of an ICO image
| horizontalHotspot     | Number | horizontal hotspot of a CUR image
| verticalHotspot       | Number | vertical hotspot of a CUR image
| imageSize             | Number | (interal) size of imageData's buffer
| imageOffset           | Number | (interal) offset start of the image data
| imageType             | String | 'png' or 'bmp'
| imageData             | [Buffer](https://nodejs.org/api/buffer.html) | image data of the icon