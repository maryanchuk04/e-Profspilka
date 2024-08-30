import { ApiService } from './config/ApiService';

export class AdvantagesService {
    #service = new ApiService();
    #advantagesUrl = '/advantage';

    getAdvantages() {
        return this.#service.get(this.#advantagesUrl);
    }
}
