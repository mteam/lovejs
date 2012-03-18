var images, nekochan, clouds, cloudBuffer, cloudInterval

var images = {
	face: 'face.png',
	body: 'body.png',
	cloud: 'cloud_plain.png',
	ear: 'ear.png',
	logo: 'love.png'
};

love.load = function () {
	var file, asset, image;
	for (name in images) {
		file = images[name];
		asset = love.assets.newImage('files/' + file);
		image = love.graphics.newImage(asset);
		images[name] = image;
	}

	love.graphics.setBackgroundColor(0xff, 0xf1, 0xf7);
	love.graphics.ctx.globalAlpha = 200 / 255;
};

love.update = function (dt) {
	trySpawnCloud(dt);
	nekochan.update(dt);

	var cloud;
	for (var i = 0; i < clouds.length; i++) {
		cloud = clouds[i];
		cloud.x = cloud.x + cloud.s * dt;
	}
};

love.draw = function () {
	love.graphics.draw(images.logo, 300, 280, null, null, null, 128, 64);

	var cloud, x, y;
	for (var i = 0; i < clouds.length; i++) {
		cloud = clouds[i];
		x = cloud.x | 0;
		y = cloud.y | 0;
		love.graphics.draw(images.cloud, x, y);
	}

	nekochan.render();
};

// nekochan

nekochan = {
	x: 300,
	y: 150,
	a: 0,

	update: function (dt) {
		this.a = this.a + 10 * dt;
	},

	render: function () {
		love.graphics.draw(images.body, this.x, this.y, null, null, null, 64, 64);
		love.graphics.draw(images.face, this.x, this.y + Math.sin(this.a / 5) * 3, null, null, null, 64, 64);

		var r = 1 + Math.sin(this.a * Math.PI / 20);

		for (var i = 1; i <= 10; i++) {
			love.graphics.draw(images.ear, this.x, this.y, (i * Math.PI * 2 / 10) + this.a / 10, null, null, 16, 64 + 10 * r);
		}
	}
};

// clouds

clouds = [];
cloudBuffer = 0;
cloudInterval = 1;

Math.randomInt = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function trySpawnCloud(dt) {
	cloudBuffer = cloudBuffer + dt;
	
	if (cloudBuffer > cloudInterval) {
		cloudBuffer = 0;
		spawnCloud(-512, Math.randomInt(-50, 500), 80 + Math.randomInt(0, 50));
	}
}

function spawnCloud(xpos, ypos, speed) {
	clouds.push({ x: xpos, y: ypos, s: speed });
}

$(function () {
	var canvas = $('#game');
	love.init({ element: canvas });
	love.run();
});
