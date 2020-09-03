var OOH_GENERATOR = OOH_GENERATOR || {};

OOH_GENERATOR = {
  UA: navigator.userAgent,
  page: 0,
  oohData: null,
  oohSetting: {},
  oohBoardLength: 0,
  wrap: $('#ooh-generator'),
  stepLoading: $('.step-loading'),
  stepLoadingDuration: 500,
  angle: 1,
  angleWidth: 0,
  angleHeight: 0,
  uplpadFiles: null,
  fileName: '',
  init : function(){
    var A = this;

    // モダンブラウザ判定
    var modernBrowserCheck = (function(){
      var uaLower = A.UA.toLowerCase();

      if(uaLower.indexOf('edge/') > -1){
        $('body').addClass('is-edge');
      }else if(uaLower.indexOf('trident/7.0') > -1){
        $('body').addClass('is-ie11');
      }else if(uaLower.indexOf('firefox') > -1){
        $('body').addClass('is-firefox');
      }else if(uaLower.indexOf('chrome') > -1){
        $('body').addClass('is-chrome');
      }else if(uaLower.indexOf('safari') > -1){
        $('body').addClass('is-safari');
      }
    })();

    $('.modal-trigger').modaal({
      animation_speed: 100,
      background: '#000',
      overlay_opacity: 0.8,
      overlay_close: false,
      background_scroll: false,
      custom_class: 'generator_modaal'
    });

    $.getJSON(
        '/assets/javascripts/generator/ooh.json',
        function(data) {
          A.page = placementId;
          A.oohData = data;

/*          if (typeof A.oohData[ A.page - 1 ] === "undefined"){
            location.href = '/';
          }else{*/
            A.fileName = $('.step-l .step-01 .generator-heading').text();
            for( var i = 0; i < A.oohData[ A.page - 1 ].length; i++ ){
              var angleList =
                  '<li>'+
                  '	<a href="#" class="white-over" data-angle="' + (i+1) +'">'+
                  '		<div class="img" style="background-image: url(/assets/images/generator/page-' + A.page + '/angle-thumb-' + (i+1) +'.jpg);"></div>'+
                  '		<span class="zoom-icon">'+
                  '			<svg '+
                  '			 xmlns="http://www.w3.org/2000/svg"'+
                  '			 xmlns:xlink="http://www.w3.org/1999/xlink"'+
                  '			 width="12px" height="12px">'+
                  '			<path fill-rule="evenodd"  fill="rgb(0, 0, 0)"'+
                  '			 d="M4.206,0.008 L0.437,0.055 C0.328,0.056 0.220,0.111 0.165,0.165 C0.084,0.246 0.056,0.327 0.055,0.435 L0.008,4.189 C0.007,4.297 0.033,4.377 0.113,4.457 C0.193,4.537 0.274,4.563 0.382,4.562 L1.138,4.555 C1.354,4.552 1.518,4.390 1.520,4.175 L1.541,3.109 C1.542,2.948 1.759,2.839 1.893,2.972 L4.805,5.872 C4.966,6.032 5.182,6.030 5.345,5.867 L5.891,5.324 C6.054,5.161 6.056,4.946 5.896,4.786 L2.957,1.859 C2.850,1.752 2.906,1.536 3.095,1.508 L4.165,1.487 C4.381,1.485 4.544,1.322 4.546,1.107 L4.554,0.354 C4.555,0.246 4.529,0.166 4.448,0.086 C4.395,0.033 4.314,0.007 4.206,0.008 Z"/>'+
                  '			<path fill-rule="evenodd"  fill="rgb(0, 0, 0)"'+
                  '			 d="M7.794,11.993 L11.563,11.946 C11.671,11.945 11.780,11.890 11.834,11.836 C11.916,11.754 11.944,11.673 11.945,11.566 L11.992,7.811 C11.993,7.703 11.967,7.623 11.887,7.543 C11.807,7.463 11.726,7.437 11.618,7.438 L10.862,7.446 C10.646,7.448 10.482,7.611 10.480,7.826 L10.459,8.891 C10.458,9.052 10.241,9.162 10.107,9.029 L7.195,6.128 C7.034,5.969 6.818,5.971 6.655,6.134 L6.109,6.677 C5.946,6.840 5.944,7.055 6.104,7.215 L9.043,10.142 C9.150,10.248 9.094,10.464 8.905,10.492 L7.835,10.513 C7.619,10.516 7.456,10.678 7.454,10.893 L7.446,11.647 C7.445,11.754 7.471,11.835 7.552,11.914 C7.605,11.968 7.686,11.994 7.794,11.993 Z"/>'+
                  '			</svg>'+
                  '		</span>'+
                  '	</a>'+
                  '</li>';

              $('.angle-list').append(angleList);
              $('.angle-list li:first-child a').addClass('select');
            //}

            $('body').addClass('show');

            A.step01();

            // A.debug(7,3);
          }
        }
    );
  },
  step01 : function(){
    var A = this;

    A.stepLoading.hide();

    $('.angle-list a').on('click', function(){
      $('.angle-list a').removeClass('select');
      $(this).addClass('select');
      return false;
    });

    $('.go-step-02 a').on('click', function(){
      A.stepLoading.show();

      A.angle = $('.angle-list a.select').data('angle');
      A.oohSetting = A.oohData[ A.page - 1 ][ A.angle - 1 ];
      A.oohBoardLength = A.oohSetting.board.length;

      setTimeout(function(){
        A.moveStep(2);
        A.step02();
      }, A.stepLoadingDuration);

      return false;
    });
  },
  step02 : function(){
    var A = this;

    A.stepLoading.hide();

    var goStep03 = function(){
      A.stepLoading.show();

      setTimeout(function(){
        A.step03(A.uplpadFiles);
        A.moveStep(3);
      }, A.stepLoadingDuration);
    };

    $('.drop-box').on({
      'dragenter': function (e) {
        e.stopPropagation();
        e.preventDefault();
      },
      'dragover': function (e) {
        e.stopPropagation();
        e.preventDefault();
      },
      'drop': function (e) {
        e.preventDefault();

        A.uplpadFiles = e.originalEvent.dataTransfer.files;
        goStep03();
      }
    });

    $('.go-step-03 input').val('').off('change').on('change', function (e) {
      A.uplpadFiles = e.target.files;
      goStep03();
    });
  },
  step03 : function(){
    var A = this;

    var reader = new FileReader();

    reader.readAsDataURL(A.uplpadFiles[0]);
    reader.onload = function (e) {
      A.stepLoading.hide();

      var trimAspect = A.oohSetting.trimAspect;

      $('#triming')
          .attr('src', reader.result)
          .cropper('destroy')
          .cropper({
            aspectRatio: trimAspect[0] / trimAspect[1],
            ready: function(e){
              $(this).cropper('setDragMode', 'move');
            }
          });

      $('.back-step-02 a').on('click', function(){
        A.stepLoading.show();

        setTimeout(function(){
          A.moveStep(2);
          A.step02();
        }, A.stepLoadingDuration);

        return false;
      });

      $('.go-step-04 a').on('click', function(){
        A.stepLoading.show();

        var trimImg = $('#triming').cropper('getCroppedCanvas');

        var canAngle = document.getElementById('can-angle');
        var ctxAngle = canAngle.getContext('2d');
        var imgAngle = new Image();

        var canComp = document.getElementById('comp');
        var ctxComp = canComp.getContext('2d');

        var canBoardURI = [];

        var boardIndex = 0;
        var boardRendering = function(){
          var scene = new THREE.Scene();

          var camera = new THREE.PerspectiveCamera(60, A.angleWidth / A.angleHeight, 0.1, 1000);

          var renderer = new THREE.WebGLRenderer({
            alpha: true,
            preserveDrawingBuffer: true
          });

          renderer.setSize(A.angleWidth, A.angleHeight);

          var geom = A.oohSetting.geom;
          var geomParam = A.oohSetting.geomParam;

          switch( geom ) {
            case 'plane':
              var geometry = new THREE.PlaneGeometry(geomParam[0] * A.oohSetting.board[boardIndex].trimWidth, geomParam[1]);

              break;
            case 'cylinder':
              var geometry = new THREE.CylinderGeometry(geomParam[0], geomParam[1], geomParam[2], geomParam[3], geomParam[4], true, geomParam[5], geomParam[6] * Math.PI);

              break;
          }

          var position = A.oohSetting.board[boardIndex].position;
          var scale = A.oohSetting.board[boardIndex].scale;
          var rotation = A.oohSetting.board[boardIndex].rotation;
          var cameraPosition = A.oohSetting.board[boardIndex].cameraPosition;

          var material = new THREE.MeshBasicMaterial( {
            map:THREE.ImageUtils.loadTexture(canBoardURI[boardIndex], {}, function() {
              var mesh = new THREE.Mesh(geometry, material);

              mesh.position.set( position[0], position[1], position[2] );
              mesh.scale.set( scale[0], scale[1], scale[2] );
              mesh.rotation.set( rotation[0] * ( Math.PI / 180 ), rotation[1] * ( Math.PI / 180 ), rotation[2] * ( Math.PI / 180 ) );

              scene.add(mesh);

              camera.position.set( cameraPosition[0], cameraPosition[1], cameraPosition[2] );
              camera.lookAt(new THREE.Vector3(0, 0, 0));

              renderer.render(scene, camera);

              $('#WebGL-output').empty().append(renderer.domElement);
              $('#WebGL-output canvas').attr('id', 'can-board-fit');

              var imgBoard = new Image();

              var completeBoard = document.getElementById('can-board-fit');
              var dataURI = completeBoard.toDataURL( "image/png", 1 );

              imgBoard.src = dataURI;
              imgBoard.onload = function(){
                ctxComp.drawImage(imgBoard, 0, 0, imgBoard.width, imgBoard.height);

                boardIndex++;

                if( boardIndex < A.oohBoardLength ){
                  boardRendering();
                }else{
                  setTimeout(function(){
                    A.moveStep(4);
                    A.step04();
                  }, A.stepLoadingDuration);
                }
              };
            })
          });
        };


        $('#can-board-default-wrap').empty().append(trimImg);
        $('#can-board-default-wrap canvas').attr('id', 'can-board-default');

        var canBoardDefault = document.getElementById('can-board-default');
        var canBoardDefaultURI = canBoardDefault.toDataURL( "image/png", 1 );

        var imgBoardDefault = new Image();
        imgBoardDefault.src = canBoardDefaultURI;
        imgBoardDefault.onload = function(){
          for( var i=0; i<A.oohBoardLength; i++ ){
            $('#can-board-wrap').empty().append(
                '<canvas id="can-board-' + (i+1) + '" width="' + imgBoardDefault.width * A.oohSetting.board[i].trimWidth +'" height="' + imgBoardDefault.height + '"></canvas>'
            );

            var canBoard = document.getElementById('can-board-' + (i+1));
            var ctxBoard = canBoard.getContext('2d');

            ctxBoard.clearRect(0, 0, imgBoardDefault.width, imgBoardDefault.height);
            ctxBoard.drawImage(imgBoardDefault, imgBoardDefault.width * A.oohSetting.board[i].trimOffset, 0, imgBoardDefault.width, imgBoardDefault.height);

            canBoardURI[i] = canBoard.toDataURL( "image/png", 1 );
          }


          imgAngle.src = '/assets/images/generator/page-' + A.page + '/angle-' + A.angle +'.jpg';
          imgAngle.onload = function(){
            A.angleWidth = imgAngle.width;
            A.angleHeight = imgAngle.height;

            canAngle.width = A.angleWidth;
            canAngle.height = A.angleHeight;

            $('#comp').attr({
              'width': A.angleWidth,
              'height': A.angleHeight
            });

            ctxComp.drawImage(imgAngle, 0, 0, imgAngle.width, imgAngle.height);

            boardRendering();
          };
        };


        return false;
      });

    };
  },
  step04 : function(){
    var A = this;

    A.stepLoading.hide();

    var canvas = document.getElementById('comp');
    var link = document.getElementById('download-btn');
    var blob, imageURL;
    var fileName = 'SMP_' + A.fileName + '.jpg';

    link.download = fileName;

    if (canvas.toBlob) {
      canvas.toBlob(function (blob) {
        imageURL = URL.createObjectURL(blob);
        link.href = imageURL;
      });
    } else if (canvas.msToBlob) {
      blob = canvas.msToBlob();
      imageURL = URL.createObjectURL(blob);
      link.href = imageURL;
      link.addEventListener('click', function (ev) {
        ev.preventDefault();
        navigator.msSaveBlob(blob, fileName);
      });
    } else {
      imageURL = canvas.toDataURL();
      link.href = imageURL;
    }

    $('.back-step-03 a').on('click', function(){
      A.stepLoading.show();

      setTimeout(function(){
        A.moveStep(1);
        A.step01();
      }, A.stepLoadingDuration);

      return false;
    });
  },
  moveStep : function(num){
    var A = this;

    A.wrap.find('.step').removeClass('show');
    A.wrap.find('.step-0' + num).addClass('show');
  },
  debug : function(page,angle){
    var A = this;

    A.page = page;
    A.angle = angle;
    A.oohSetting = A.oohData[ A.page - 1 ][ A.angle - 1 ];
    A.oohBoardLength = A.oohSetting.board.length;

    $('.step-r .step-04').addClass('show');

    var canAngle = document.getElementById('can-angle');
    var ctxAngle = canAngle.getContext('2d');
    var imgAngle = new Image();

    var canComp = document.getElementById('comp');
    var ctxComp = canComp.getContext('2d');

    var canBoardURI = [];

    var boardIndex = 0;
    var boardRendering = function(){
      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera(60, A.angleWidth / A.angleHeight, 0.1, 1000);

      var renderer = new THREE.WebGLRenderer({
        alpha: true,
        preserveDrawingBuffer: true
      });

      renderer.setSize(A.angleWidth, A.angleHeight);

      var geom = A.oohSetting.geom;
      var geomParam = A.oohSetting.geomParam;

      switch( geom ) {
        case 'plane':
          var geometry = new THREE.PlaneGeometry(geomParam[0] * A.oohSetting.board[boardIndex].trimWidth, geomParam[1]);

          break;
        case 'cylinder':
          var geometry = new THREE.CylinderGeometry(geomParam[0], geomParam[1], geomParam[2], geomParam[3], geomParam[4], true, geomParam[5], geomParam[6] * Math.PI);

          break;
      }

      var position = A.oohSetting.board[boardIndex].position;
      var scale = A.oohSetting.board[boardIndex].scale;
      var rotation = A.oohSetting.board[boardIndex].rotation;
      var cameraPosition = A.oohSetting.board[boardIndex].cameraPosition;

      var material = new THREE.MeshBasicMaterial( {
        map:THREE.ImageUtils.loadTexture(canBoardURI[boardIndex], {}, function() {
          var mesh = new THREE.Mesh(geometry, material);

          mesh.position.set( position[0], position[1], position[2] );
          mesh.scale.set( scale[0], scale[1], scale[2] );
          mesh.rotation.set( rotation[0] * ( Math.PI / 180 ), rotation[1] * ( Math.PI / 180 ), rotation[2] * ( Math.PI / 180 ) );

          scene.add(mesh);

          camera.position.set( cameraPosition[0], cameraPosition[1], cameraPosition[2] );
          camera.lookAt(new THREE.Vector3(0, 0, 0));

          renderer.render(scene, camera);

          $('#WebGL-output').empty().append(renderer.domElement);
          $('#WebGL-output canvas').attr('id', 'can-board-fit');

          var imgBoard = new Image();

          var completeBoard = document.getElementById('can-board-fit');
          var dataURI = completeBoard.toDataURL( "image/png", 1 );

          imgBoard.src = dataURI;
          imgBoard.onload = function(){
            ctxComp.drawImage(imgBoard, 0, 0, imgBoard.width, imgBoard.height);

            boardIndex++;

            if( boardIndex < A.oohBoardLength ){
              boardRendering();
            }else{
              setTimeout(function(){
                A.moveStep(4);
                A.step04();
              }, A.stepLoadingDuration);
            }
          };
        })
      });
    };


    // $('#can-board-default-wrap').empty().append(trimImg);
    // $('#can-board-default-wrap canvas').attr('id', 'can-board-default');

    // var canBoardDefault = document.getElementById('can-board-default');
    // var canBoardDefaultURI = canBoardDefault.toDataURL( "image/png", 1 );

    var imgBoardDefault = new Image();
    imgBoardDefault.src = 'test.jpg';
    imgBoardDefault.onload = function(){
      for( var i=0; i<A.oohBoardLength; i++ ){
        $('#can-board-wrap').append(
            '<canvas id="can-board-' + (i+1) + '" width="' + imgBoardDefault.width * A.oohSetting.board[i].trimWidth +'" height="' + imgBoardDefault.height + '"></canvas>'
        );

        var canBoard = document.getElementById('can-board-' + (i+1));
        var ctxBoard = canBoard.getContext('2d');

        ctxBoard.clearRect(0, 0, imgBoardDefault.width, imgBoardDefault.height);
        ctxBoard.drawImage(imgBoardDefault, imgBoardDefault.width * A.oohSetting.board[i].trimOffset, 0, imgBoardDefault.width, imgBoardDefault.height);

        canBoardURI[i] = canBoard.toDataURL( "image/png", 1 );
      }

      // return;


      imgAngle.src = '/assets/images/generator/page-' + A.page + '/angle-' + A.angle +'.jpg';
      imgAngle.onload = function(){
        A.angleWidth = imgAngle.width;
        A.angleHeight = imgAngle.height;

        canAngle.width = A.angleWidth;
        canAngle.height = A.angleHeight;

        $('#comp').attr({
          'width': A.angleWidth,
          'height': A.angleHeight
        });

        ctxComp.drawImage(imgAngle, 0, 0, imgAngle.width, imgAngle.height);

        boardRendering();
      };
    };
  }
};


$(function(){
  OOH_GENERATOR.init();
});
