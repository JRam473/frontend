const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando build...');

// Verificar que la carpeta dist existe
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ ERROR: No existe la carpeta dist/');
  console.log('📁 Contenido actual del directorio:');
  fs.readdirSync(__dirname).forEach(file => {
    console.log('   - ' + file);
  });
  process.exit(1);
}

// Verificar que index.html existe
const indexPath = path.join(distPath, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ ERROR: No existe dist/index.html');
  console.log('📁 Contenido de dist/:');
  fs.readdirSync(distPath).forEach(file => {
    console.log('   - ' + file);
  });
  process.exit(1);
}

console.log('✅ Build verificado correctamente');
console.log('📁 Archivos en dist/:');
fs.readdirSync(distPath).forEach(file => {
  const filePath = path.join(distPath, file);
  const stats = fs.statSync(filePath);
  console.log(`   - ${file} (${stats.isDirectory() ? 'directorio' : (stats.size + ' bytes')})`);
});