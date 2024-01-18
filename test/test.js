import test from "node:test";
import assert from "node:assert";
import { html } from "../src/html.js";

const username = "G";
const descriptionSafe = "This is a safe description.";
const descriptionUnsafe =
  "<script>alert('This is an unsafe description.')</script>";

test("renders correctly", (t) => {
  assert.strictEqual(html`Hey, ${username}!`, `Hey, ${username}!`);
});

test("renders safely", (t) => {
    assert.strictEqual(
        html`<p>${descriptionSafe}</p>`,
        "<p>This is a safe description.</p>",
    );
    }
);

test("escapes unsafe output", (t) => {
    assert.strictEqual(
        html`<p>${descriptionUnsafe}</p>`,
        `<p>&lt;script&gt;alert(&apos;This is an unsafe description.&apos;)&lt;/script&gt;</p>`,
    );
    }
);

test("escapes unsafe output", (t) => {
    assert.strictEqual(
        html`<p>${descriptionUnsafe}</p>`,
        `<p>&lt;script&gt;alert(&apos;This is an unsafe description.&apos;)&lt;/script&gt;</p>`,
    );
    }
);

test("renders arrays", (t) => {
    assert.strictEqual(
        html`<p>${[descriptionSafe, descriptionUnsafe]}</p>`,
        "<p>This is a safe description.&lt;script&gt;alert(&apos;This is an unsafe description.&apos;)&lt;/script&gt;</p>",
    );
    }
);

test("bypass escaping", (t) => {
    assert.strictEqual(
        html`<p>!${[descriptionSafe, descriptionUnsafe]}</p>`,
        "<p>This is a safe description.<script>alert('This is an unsafe description.')</script></p>",
    );
    }
);

test("renders wrapped html calls", (t) => {
    assert.strictEqual(
        html`<p>!${html`<strong>${descriptionUnsafe}</strong>`}</p>`,
        "<p><strong>&lt;script&gt;alert(&apos;This is an unsafe description.&apos;)&lt;/script&gt;</strong></p>",
    );
    }
);
