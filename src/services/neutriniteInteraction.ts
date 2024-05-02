import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

import { idlFactory as neutriniteIdlFactory } from '@/declarations/neutrinite';


async function getICPtoUSDRate() {
    const agent = new HttpAgent({ host: 'https://icp0.io' });
    const actor = Actor.createActor(neutriniteIdlFactory, { agent, canisterId: Principal.fromText('u45jl-liaaa-aaaam-abppa-cai')});

    try {
        const result: any[] = await actor.get_latest() as any[];
        // console.log('Raw response:', result);

        // Extract the ICP/USD rate
        for (let i = 0; i < result.length; i++) {
            if (result[i][1] === 'ICP/USD') {
                // console.log('ICP/USD rate:', result[i][2]);
                return result[i][2];
            }
        }
    } catch (error) {
        // console.error('Error fetching ICP/USD rate:', error);
        throw new Error('Error fetching ICP/USD rate');
    }
}

getICPtoUSDRate();
export default getICPtoUSDRate;
