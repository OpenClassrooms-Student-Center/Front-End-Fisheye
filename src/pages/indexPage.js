import { FisheyeAPI } from "../api/FisheyeAPI";
import { PhotographersController } from "../controller/PhotographersController";
import { PhotographersService } from "../services/PhotographersService";
import { PhotographersView } from "../views/PhotographersView";

function indexPage() {
	const fisheyeAPI = new FisheyeAPI();

	const photographersService = new PhotographersService(fisheyeAPI);
	const photographersView = new PhotographersView(".photographer_section");
	const photographersController = new PhotographersController(
		photographersService,
		photographersView
	);

	photographersController.init();
}

indexPage();
