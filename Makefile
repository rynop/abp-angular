.PHONY: all clean run* deploy* install* tools*

webapp-test:
	cd webapp && yarn run build:test

webapp-prod:
	cd webapp && yarn run build:prod

clean: clean/webapp

clean/webapp:
	rm -rf ./webapp/dist

#
# Installers
#
install: install/webapp

install/webapp:
	# rebuild compiled pkgs without messing with yarn.lock 
	cd webapp && npm rebuild --update-binary > /dev/null

#
# Runners
#
run/ngrok-webapp:
	~/ngrok http -bind-tls=true -subdomain=$(shell hostname |tr -d .)-abp-angular 4200

run/local-webapp:
	cd webapp && yarn run start

#
# Deployers
#
deploy/firebase-functions:
	cd firebase && firebase deploy --only functions
