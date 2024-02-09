import {chromium, devices} from 'playwright' //production
import {expect} from '@playwright/test' //testing
export async function GetPemilu(nik: number) { 
    const browser = (await chromium.launch({headless: true})).newContext()
    const page = await (await browser).newPage()
    await page.goto('https://cekdptonline.kpu.go.id/');
    await page.locator('input').pressSequentially(nik.toString())
    await page.getByRole('button', {name: 'Pencarian'}).click()
    await page.waitForTimeout(2000)
    let lmao = await page.getByText('Nama Pemilih').locator('..').isVisible()
if(!lmao)
{
    await (await browser).close()
    return {response: 403, message: "Data tidak terdaftar!"}
}

const fullname = await (await page.getByText('Nama Pemilih').locator('..').allInnerTexts()).toString()
const TPS = await (await page.getByText('TPS', {exact: true}).locator('..').allInnerTexts()).toString()
const Kabupaten = await (await page.getByText('Kabupaten').locator('..').allInnerTexts()).toString()
const AlamatTPS = await (await page.getByText('Alamat Potensial TPS').locator('..').allInnerTexts()).toString()
const Kecamatan = await (await page.getByText('Kecamatan').locator('..').allInnerTexts()).toString()
const Kelurahan = await (await page.getByText('Kelurahan').locator('..').allInnerTexts()).toString()
;(await browser).close()
return {response: 200,
data_pemilu: {
    fullname: fullname.split("\n")[1],
    TPS: TPS.split("\n")[1],
    Kabupaten: Kabupaten.split("\n")[1],
    AlamatTPS: AlamatTPS.split("\n")[1],
    Kecamatan: Kecamatan.split("\n")[1],
    Kelurahan: Kelurahan.split("\n")[1]
}}
}