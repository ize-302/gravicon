figma.showUI(__html__, { themeColors: true, height: 40, width: 200 });
figma.ui.onmessage = async (domain) => {
  await fetch(`https://gravicon-plugin-server-pump.koyeb.app?url=${domain}`)
    .then((response) => response.json())
    .then((json) => {
      figma.createImageAsync(json.data).then(async (image: Image) => {
        // Create a rectangle that's the same dimensions as the image.
        const node = figma.createRectangle();
        const { width, height } = await image.getSizeAsync();
        node.resize(width, height);

        // Render the image by filling the rectangle.
        node.fills = [
          {
            type: "IMAGE",
            imageHash: image.hash,
            scaleMode: "FILL",
          },
        ];
        figma.closePlugin();
      });
    });
};
