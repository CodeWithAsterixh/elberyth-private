const PID = process.env.SANITY_STUDIO_PID || 'default';
const DATASET = process.env.SANITY_STUDIO_DATASET || 'default';

const environment = {
    PID,
    DATASET
}


export default environment