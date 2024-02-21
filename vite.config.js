import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
	// Load environment variables based on the current mode
	const env = loadEnv(mode, process.cwd(), '');

	// Return the configuration object
	return {	
		// Define environment variables to be used in the application
		define: {
			'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(env.GOOGLE_MAPS_API_KEY),
			'process.env.WHA_API_URL': JSON.stringify(env.WHA_API_URL)
		},
		// Configuration for the development server
		server: {
			host: env.HOST, // Set host
			port: env.PORT // Set port
		},
	  plugins: [react()],
	}
  })
