import path from 'path';
import  {convertImage} from '../utilities/imgprocess';

describe('A suite to test finding a cached image', () => {
	beforeAll(async () => {
		await convertImage('icelandwaterfall', 200, 200);
	});
	it('returns a path on a found image', async () => {
		const outputPath = path.join(
			__dirname,
			'../images/thumbs/',
			`icelandwaterfall(200x200).jpg`
		);
		console.log(outputPath)
		expect(await (await convertImage('icelandwaterfall', 200, 200)).replace('src','build')).toBe(outputPath);
	});
});

