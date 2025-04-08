all: install run

install:
	cd backend && npm install
	cd blog && npm install

run:
	(cd backend && npm run dev) &
	(cd blog && npm run dev -- --host) &
	wait

git:
	git config --global user.email ""
	git config --global user.name "hick-hpe"