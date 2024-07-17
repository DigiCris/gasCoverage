# gasCoverage
To optimize gas

1. Compile the project in Remix.
2. Go to Compilation Details.
3. Copy the gasEstimate.
4. Paste it into the `gasestimation.json` file. 
5. Open the `index.html` file in a server (localhost works).

At this point, you will be able to see the gas usage of functions ordered from the ones that consume the most to the ones that consume the least.

Below the graph, there will be a list of all the functions that the compiler could not estimate the gas for, indicating that the gas cost would be infinite.

6. You can print the file by pressing the print button in PDF format.
7. Hovering over the bars in the diagram that represent each function will show a tooltip with the amount of gas used, otherwise, it will be displayed as a percentage.

Note: The idea is to be able to tackle the functions that consume the most gas to achieve better optimization of the Solidity code.

![View](https://github.com/DigiCris/gasCoverage/blob/main/view.png)