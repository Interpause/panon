function get_root() {
  var p_ui = plasmoid.file('ui')
  p_ui = p_ui.split('/')
  p_ui.pop(-1)
  return p_ui.join('/')
}

function get_scripts_root() {
  return get_root() + '/scripts'
}

function chdir_scripts_root() {
  return 'cd "' + get_scripts_root() + '";'
}

function create_venv() {
  return (
    chdir_scripts_root() +
    'test -d venv || python3 -m venv venv;' +
    '. venv/bin/activate;' +
    'pip install -r requirements.txt;' +
    'touch venv/.created;'
  )
}

function activate_venv() {
  return (
    chdir_scripts_root() +
    'until test -f venv/.created; do sleep 1; done;' +
    '. venv/bin/activate;'
  )
}

function random(seed) {
  var x = Math.sin(seed * 1000) * 10000
  return x - Math.floor(x)
}
