const fs = require("fs/promises");
const path = require("path");

const { writeToFile } = require("../utils");

const experienceService = {
	experiencePath: "./data/experience.json",
	readExperience: async function () {
		try {
			const data = await fs.readFile(
				path.join(process.cwd(), this.experiencePath),
				"utf-8"
			);
			return JSON.parse(data);
		} catch (e) {
			throw new Error(e);
		}
	},
	writeExperience: async function (body) {
		try {
			const data = await this.readExperience();
			const id = data.length + 1;
			data.push({ id, ...body });
			const newData = JSON.stringify(data);
			await writeToFile(newData, this.experiencePath);
			return body;
		} catch (e) {
			throw new Error(e);
		}
	},
	updateExperience: async function (body) {
		try {
			const { id } = body;
			const data = await this.readExperience();
			// find match
			for (let i = 0; i < data.length; i++) {
				if (data[i].id === id) {
					data[i] = { ...data[i], ...body };
					// write new info
					const newData = JSON.stringify(data);
					await writeToFile(newData, this.experiencePath);
					return data[i];
				}
			}
			return false;
		} catch (e) {
			throw new Error(e);
		}
	},
	deleteExperience: async function (body) {
		try {
			const { id } = body;
			const data = await this.readExperience();
			// find match
			const match = data.find((experience) => experience.id === id);
			if (match) {
				const newData = JSON.stringify(
					data.filter((experience) => experience.id !== id)
				);
				// write new info
				await writeToFile(newData, this.experiencePath);
				return match;
			}
			return false;
		} catch (e) {
			throw new Error(e);
		}
	},
};

module.exports = experienceService;
