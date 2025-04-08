all: install run

install:
	cd backend && npm install
	cd blog && npm install

run:
	bash -c ' \
		cd backend && \
		NODE_ENV=development \
		HOST=https://reblog.netlify.app/ \
		PORT=5000 \
		DB_SOURCE=./database.db \
		FRONTEND_URL=https://reblog.netlify.app:5173 \
		COOKIE_SECRET=s837d89u9i202dj90dol \
		npm run dev \
	' & \
	bash -c ' \
		cd blog && \
		VITE_API_URL=https://reblog.netlify.app:5000/ \
		npm run dev -- --host \
	' & \
	wait



git:
	git config --global user.email ""
	git config --global user.name "hick-hpe"