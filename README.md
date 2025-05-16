# Vite Bug: Externalized import inlined in HTML

Vite issue: https://github.com/vitejs/vite/issues/20053

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

4. Open [dist/index.html](./dist/index.html) in text editor and see the
   following:

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

To the best of my knowledge, the bug occurs here:
https://github.com/vitejs/vite/blob/0d18fc1dc65f5c8d855808f23754c0c4902f07d9/packages/vite/src/node/plugins/html.ts#L916-L919.
That code should be modified to not inline the externalized modules

The code below it is handling this correctly:
https://github.com/vitejs/vite/blob/0d18fc1dc65f5c8d855808f23754c0c4902f07d9/packages/vite/src/node/plugins/html.ts#L927-L928

Related changes:

- https://github.com/vitejs/vite/pull/18618
- https://github.com/vitejs/vite/pull/4555
