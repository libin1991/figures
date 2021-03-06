#!/usr/bin/env node
'use strict';
const fs = require('fs');
const importFresh = require('import-fresh');
const table = require('markdown-table');

const load = value => {
	Object.defineProperty(process, 'platform', {value});
	return importFresh('.');
};

const darwin = load('darwin');
const win32 = load('win32');

const jsonTable = [
	[
		'Name',
		'Real OSes',
		'Windows'
	]
];

// TODO: Use `Object.entries` when targeting Node.js 8
for (const key of Object.keys(darwin)) {
	jsonTable.push([key, darwin[key], win32[key]]);
}

const figureTable = table(jsonTable, {
	align: [
		'',
		'c',
		'c'
	]
});

let readme = fs.readFileSync('readme.md', 'utf8');
readme = readme.replace(/## Figures[^#]*/gm, `## Figures\n\n${figureTable}\n\n\n`);

fs.writeFileSync('readme.md', readme);
