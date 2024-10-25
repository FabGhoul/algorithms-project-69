import { test, expect } from "@jest/globals";
import search, { indexReverse } from "../src/index.js";

test('search', () => {
  const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
  const doc2 = { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." };
  const doc3 = { id: 'doc3', text: "I'm your shooter." };
  const docs = [doc1, doc2, doc3];

  expect(search(docs, 'shoot at')).toStrictEqual(['doc2', 'doc1']);
});

test('search', () => {
  const doc1 = { id: 'doc1', text: "Ten eleven twelve thirteen fourteen" };
  const doc2 = { id: 'doc2', text: "One two three" };
  const doc3 = { id: 'doc3', text: "Two cats eat one fish." };
  const doc4 = { id: 'doc4', text: "One one Two two Three three" };
  const doc5 = { id: 'doc5', text: "One cat eats one fish." };
  const doc6 = { id: 'doc6', text: "One one Two two" };
  const docs = [doc1, doc2, doc3, doc4, doc5, doc6];

  expect(search(docs, 'one two three')).toStrictEqual(['doc4', 'doc2', 'doc6', 'doc3', 'doc5']);
});

test('indexReverse', () => {
  const doc1 = { id: 'doc1', text: 'some text' };
  const doc2 = { id: 'doc2', text: 'some text too' };
  const docs = [doc1, doc2];

  expect(indexReverse(docs)).toStrictEqual({
    some: { doc1: { count: 1, totalCount: 2 }, doc2: { count: 1, totalCount: 3 } },
    text: { doc1: { count: 1, totalCount: 2 }, doc2: { count: 1, totalCount: 3 } },
    too: { doc2: { count: 1, totalCount: 3 } },
  });
});
