const fs = require("fs/promises");
const path = require("path");

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
			await fs.writeFile(
				path.join(process.cwd(), this.experiencePath),
				newData
			);
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
					await fs.writeFile(
						path.join(process.cwd(), this.experiencePath),
						JSON.stringify(data)
					);
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
			const newData = data.filter((experience) => experience.id !== id);
			// write new info
			if (newData.length === 0) {
				return false;
			}
			await fs.writeFile(
				path.join(process.cwd(), this.experiencePath),
				JSON.stringify(newData)
			);
			return true;
		} catch (e) {
			throw new Error(e);
		}
	},
};

const educationService = {
	readEducation: async function () {
		const educationPath = "./data/education.json";
		try {
			const data = await fs.readFile(
				path.join(process.cwd(), educationPath),
				"utf-8"
			);
			return JSON.parse(data);
		} catch (e) {
			throw new Error(e);
		}
	},
};

module.exports = { experienceService, educationService };
