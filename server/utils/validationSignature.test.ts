import {describe, expect, it} from "vitest";
import {createSignature, verifySignature} from "~~/server/utils/validationSignature";


describe("createSignature",()=>{
  it("should make a hash consistently",async ()=>{
    expect(await createSignature("test", "This is a test string.")).toMatchInlineSnapshot(`"03df1858691086a9083e251fa53f1fb38859f3bbd2aee422cafdd8a7ce99b2a2"`);
  })
})

describe("verifySignature", ()=>{
  it("should verify a signature with the same inputs as createSignature", async ()=>{
    const testHash = await createSignature("test", "This is a test string.")
    expect(await verifySignature("test", `sha256=${testHash}`, "This is a test string.")).toBeTruthy();
  })
})
