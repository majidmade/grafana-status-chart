# incompatible engine

if you get an error about an incompatible version of node, [install nvm](https://github.com/nvm-sh/nvm#installing-and-updating) then run `nvm use` in the terminal session

# running locally

this kinda depends on how you install/run grafana, but here's how i have it set up:

i installed grafana via `brew` and use `brew services start grafana` to run it.

my `/usr/local/etc/grafana/grafana.ini` has the following entry:

```ini
plugins = /Users/mrazvi/workspace/healthwatch/releases/grafana-release/jobs/grafana/templates/plugins
```

then use `yarn watch`, or one of the other compilation commands as appropriate. the first time you build, you may need to restart grafana; subsequent builds should update automatically.

# running on a denver-locks environment:

*NOTE: this applies only to to pivotal/vmware environments*

(you might want to pause the relevant pipeline job so your changes arent unexpectedly overriden)

```bash
yarn lint
yarn build
pcf-target hw-pas26 # or whatever
boshd p-healthwatch2-* scp --recursive dist grafana:/tmp
boshd p-healthwatch2-* ssh grafana
sudo -i
mkdir --parents /var/vcap/packages/grafana_plugins/status-chart # if necessary
cp -r /tmp/dist /var/vcap/packages/grafana_plugins/status-chart
monit restart grafana && watch monit summary # cancel watch when it's ready
```
