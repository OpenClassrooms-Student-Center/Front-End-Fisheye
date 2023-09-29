import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
	if (command == "build") {
		return {
			base: "https://boysers.github.io/oc-Front-End-Fisheye",
		};
	}
	return {};
});
