require('module-alias/register');

const type = process.env.PROCESS_TYPE
if (type === 'web') {
  require('./web')
}
