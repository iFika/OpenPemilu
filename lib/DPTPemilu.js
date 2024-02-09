"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPemilu = void 0;
const playwright_1 = require("playwright"); //production
function GetPemilu(nik) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = (yield playwright_1.chromium.launch({ headless: true })).newContext();
        const page = yield (yield browser).newPage();
        yield page.goto('https://cekdptonline.kpu.go.id/');
        yield page.locator('input').pressSequentially(nik.toString());
        yield page.getByRole('button', { name: 'Pencarian' }).click();
        yield page.waitForTimeout(2000);
        let lmao = yield page.getByText('Nama Pemilih').locator('..').isVisible();
        if (!lmao) {
            yield (yield browser).close();
            return { response: 403, message: "Data tidak terdaftar!" };
        }
        const fullname = yield (yield page.getByText('Nama Pemilih').locator('..').allInnerTexts()).toString();
        const TPS = yield (yield page.getByText('TPS', { exact: true }).locator('..').allInnerTexts()).toString();
        const Kabupaten = yield (yield page.getByText('Kabupaten').locator('..').allInnerTexts()).toString();
        const AlamatTPS = yield (yield page.getByText('Alamat Potensial TPS').locator('..').allInnerTexts()).toString();
        const Kecamatan = yield (yield page.getByText('Kecamatan').locator('..').allInnerTexts()).toString();
        const Kelurahan = yield (yield page.getByText('Kelurahan').locator('..').allInnerTexts()).toString();
        (yield browser).close();
        return { response: 200,
            data_pemilu: {
                fullname: fullname.split("\n")[1],
                TPS: TPS.split("\n")[1],
                Kabupaten: Kabupaten.split("\n")[1],
                AlamatTPS: AlamatTPS.split("\n")[1],
                Kecamatan: Kecamatan.split("\n")[1],
                Kelurahan: Kelurahan.split("\n")[1]
            } };
    });
}
exports.GetPemilu = GetPemilu;
