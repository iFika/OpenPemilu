import * as VoterDPT from './lib/DPTPemilu'
export async function GetVoters(nik: number) {
    const result = await VoterDPT.GetPemilu(nik)
    return result
}