export default function cmatrix() {
	let amount; let size;
	if (screen.width >= 1100) {
		amount = 70;
		size = 40;
	} else if (screen.width >= 768) {
		amount = 55;
		size = 30;
	} else {
		amount = 35;
		size = 20;
	}

	// credits: Patrick Stillhart https://codepen.io/arcs/pen/bpgzwZ
	var matrix = document.getElementById('matrix')
	var ctx = matrix.getContext('2d')

	var config = {
		amount,  // of columns going down (it will top at this number)
		speed: 100,   // time between updates in ms (lower = faster)
		size,    // in px
		minLength: 5,
		maxLength: 11,
		firstColor: '#fff',
		color: '#00e2ff'
	}

	var datarray = []

	var width = ctx.canvas.width = window.innerWidth
	var height = ctx.canvas.height = window.innerHeight

	/*
	Data colum object
	=============
	*/
	function Data(x) {
		this.x = x
		this.y = 0
		this.history = []
		this.historySizeMax = Math.floor(Math.random() * config.maxLength + config.minLength)
	}

	Data.prototype = {
		update() {
			this.y += config.size
			if (this.y >= height + this.historySizeMax * config.size) {
				datarray.splice(datarray.indexOf(this), 1)
				putData()
			}

			this.history.unshift(String.fromCharCode(60 + Math.floor(Math.random() * 62)))
			if (this.history.length > this.historySizeMax) this.history.pop()
		},

		draw() {
			if(Math.random() > 0.995) return

			ctx.fillStyle = config.firstColor
			ctx.fillText(this.history[0], this.x, this.y)

			ctx.fillStyle = config.color
			for (var i = 1, char; char = this.history[i]; i++) {
				ctx.fillText(char, this.x, this.y - i * config.size)
			}
		}

	}

	var count = Math.floor(width / config.size)

	function putData() {
		var newX = Math.floor(Math.random() * count) * config.size

		for (var i = 0, row; row = datarray[i]; i++) {
			if(row.x === newX && row.y - row.historySizeMax * config.size + config.size < config.size) return
		}
		datarray.push(new Data(newX))
	}

	/*
	Init & loop
	=============
	*/
	ctx.font = config.size + 'px monospace'
	ctx.shadowOffsetX = 1
	ctx.shadowOffsetY = 1
	ctx.shadowBlur = 6
	ctx.shadowColor = config.color

	setInterval(function() {
		ctx.clearRect(0, 0, width, height)

		if (datarray.length < config.amount) putData()

		for (var i = 0, column; column = datarray[i]; i++) {
			column.update()
			column.draw()
		}

	}, config.speed)
}