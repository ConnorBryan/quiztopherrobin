import axios from 'axios';

import config from '../config';

export async function fetchQuestions() {
    try {
        const { data: { results } } = await (
            axios.get(config.QUESTION_URL)
        );

        return results;
    } catch (e) {
        console.error(e);
        return [];
    }
}
