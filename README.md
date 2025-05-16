# Vite Bug: Externalized import inlined in HTML

## Reproduction

1. Clone the repository:

   ```sh
   git clone https://github.com/maxpatiiuk/vite-externalize-inject-bug
   cd vite-externalize-inject-bug
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Build the project:

   ```sh
   npx vite build
   ```

4. Open dist/index.html in text editor and see the following:

   ```html
   <script type="importmap">
     {
       "imports": {
         "@arcgis/core/": "https://jsdev.arcgis.com/4.32/@arcgis/core/"
       }
     }
   </script>
   <!-- The @arcgis/core/Map.js script tag is not supposed to be here: -->
   <!-- And it is not valid as import map does not apply to script[src] -->
   <script type="module" crossorigin src="@arcgis/core/Map.js"></script>
   <script type="module" crossorigin src="/assets/main-By8reOiR.js"></script>
   <!-- And not sure why it gets added twice: -->
   <script type="module" crossorigin src="@arcgis/core/Map.js"></script>
   ```

   Expected to see the following:

   ```html
   <script type="importmap">
     {
       "imports": {
         "@arcgis/core/": "https://jsdev.arcgis.com/4.32/@arcgis/core/"
       }
     }
   </script>
   <script type="module" crossorigin src="/assets/main-By8reOiR.js"></script>
   ```
