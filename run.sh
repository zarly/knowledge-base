[[ -d logs ]] || mkdir logs

export PORT=3000
export NODE_ENV=production

forever start -a -l kb.log -o logs/assess.log -e logs/error.log --minUptime 10000 --spinSleepTime 10000 build/server.js
