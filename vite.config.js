import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {	
		define: {
			'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(env.GOOGLE_MAPS_API_KEY)
		},
		server: {
			host: '192.168.1.112',//184.22.160.128
			port: 80
		},
	  plugins: [react()],
	}
  })
