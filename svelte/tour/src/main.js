import App from './App.svelte';
// import "./base-import.css";

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;
