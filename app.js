
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path');

var multer = require('multer');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


/**
 * Configuration
 */

/*Multer configuration*/
app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));


/*Routes*/

app.get('/', function(req, res){
	res.render('index');
});

app.post('/upload/edi', function(req, res){
	if(done==true){
    var Parser = require('./parser.js');

    var p = new Parser("ISA*00*          *00*          *ZZ*FXK            *ZZ*ODXPEDX        *150202*1329*U*00201*000133910*0*P*^~GS*PO*FXK*ODXPEDX*20150202*1329*133910*X*004010~ST*850*339100001~BEG*00*NE*0006890717**20150202~CUR*BY*USD~REF*OR*MAIN~TD5*****VENDOR DELIVERY METHOD~N9*ZZ**CompanyID~MSG*FXK01~N9*ZZ**RequesterEmpNum~MSG*FX2269663~N1*BT*FedEx Office and Print Service*92*FedEx Office and Print Service~N2*P.O. Box 262683~N4*Plano*TX*750262683*USA~N1*ST*FedEx Office and Print 5897*92*FK04305897~N2*FX2269663 Wheeler,Brian K~N3*11751 S Cleveland Ave*Ste 14~N4*Ft Myers*FL*33907*USA~PER*RE*WORK*TE*239/936-7766~PO1*1*8*CT*52.09**VP*200000***IN*200000~CUR*BY*USD~PID*F****LZ, 24 lb Laser, 8.5x11****EN~SAC*N*B840***41672~CUR*BY*USD~TXI*ST*0~N9*ZZ**Requester~MSG*FX2269663 Wheeler,Brian K~PO1*2*2*CT*52.09**VP*200002***IN*200002~CUR*BY*USD~PID*F****LZX, 24 lb Laser, 11x17****EN~SAC*N*B840***10418~CUR*BY*USD~TXI*ST*0~N9*ZZ**Requester~MSG*FX2269663 Wheeler,Brian K~PO1*3*1*BD*22.64**VP*470135***IN*470135~CUR*BY*USD~PID*F****Chipboard, 8.5x11, 50lb, 850 per bdl****EN~SAC*N*B840***2264~CUR*BY*USD~TXI*ST*0~N9*ZZ**Requester~MSG*FX2269663 Wheeler,Brian K~PO1*4*1*BD*22.24**VP*470136***IN*470136~CUR*BY*USD~PID*F****Chipboard, 11x17, 50lb, 400 per bdl****EN~SAC*N*B840***2224~CUR*BY*USD~TXI*ST*0~N9*ZZ**Requester~MSG*FX2269663 Wheeler,Brian K~PO1*5*1*CA*124.63**VP*801406***IN*801406~CUR*BY*USD~PID*F****RGD03, Self-Adhesive, Foam Board, White, 32in x 40in, 3/16****EN~SAC*N*B840***12463~CUR*BY*USD~TXI*ST*0~N9*ZZ**Requester~MSG*FX2269663 Wheeler,Brian K~PO1*6*1*CT*51.29**VP*810230***IN*810230~CUR*BY*USD~PID*F****EC0, Resume Cardstock, Ultra Bright White, 8.5x11****EN~SAC*N*B840***5129~CUR*BY*USD~TXI*ST*0~N9*ZZ**Requester~MSG*FX2269663 Wheeler,Brian K~PO1*7*1*CT*26.89**VP*820013***IN*820013~CUR*BY*USD~PID*F****Box, Tab, 10x11x4****EN~SAC*N*B840***2689~CUR*BY*USD~TXI*ST*1.61~N9*ZZ**Requester~MSG*FX2269663 Wheeler,Brian K~PO1*8*1*CT*42.13**VP*830057***IN*830057~CUR*BY*USD~PID*F****LF Engineering Rolls 36 in x 500 ft white 20 lb****EN~SAC*N*B840***4213~CUR*BY*USD~TXI*ST*0~N9*ZZ**Requester~MSG*FX2269663 Wheeler,Brian K~PO1*9*1*CT*40.42**VP*800103***IN*800103~CUR*BY*USD~PID*F****P3  Pastel Goldenrod, Hammermill Fore MP, 20 lb, 8.5 x 11****EN~SAC*N*B840***4042~CUR*BY*USD~TXI*ST*0~N9*ZZ**Requester~MSG*FX2269663 Wheeler,Brian K~PO1*10*1*CT*58.01**VP*800263*MG*808011*IN*800263~CUR*BY*USD~PID*F****CC2 Glossy Coated Cover,8.5 x 11, 10pt Carolina C2S****EN~SAC*N*B840***5801~CUR*BY*USD~TXI*ST*0~N9*ZZ**Requester~MSG*FX2269663 Wheeler,Brian K~PO1*11*3*CT*30.93**VP*100000***IN*100000~CUR*BY*USD~PID*F****W, Standard White, 8.5x11****EN~SAC*N*B840***9279~CUR*BY*USD~TXI*ST*0~N9*ZZ**Requester~MSG*FX2269663 Wheeler,Brian K~PO1*12*1*CT*33.1**VP*100002***IN*100002~CUR*BY*USD~PID*F****WX, Standard White, 11x17****EN~SAC*N*B840***3310~CUR*BY*USD~TXI*ST*0~N9*ZZ**Requester~MSG*FX2269663 Wheeler,Brian K~CTT*12*22~AMT*TT*1036.65~SE*116*339100001~GE*1*133910~IEA*1*000133910~");

    var dataObjs = p.process_data();
    var path = p.output_1(dataObjs);
    res.render('table', {data: path});

	}
});

app.post('/excel', function(req,res){
  res.download(__dirname +'/uploads/850_1.xls');
});

/**
 * Start Server
 */

http.createServer(app).listen(3000, function () {
  console.log('Express server listening on port ' + 3000);
});
