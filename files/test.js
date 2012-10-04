
      var berlin = new google.maps.LatLng(37.785, 150.447);

      var neighborhoods = [
        new google.maps.LatLng(-20.511467, 133.447179),
        new google.maps.LatLng(12.549061, 43.422975),
        new google.maps.LatLng(52.497622, 53.396110),
        new google.maps.LatLng(52.517683, 122.394393),
        new google.maps.LatLng(37.785, -122.447)
        ];
      var nb2=[
        new google.maps.LatLng(-40.511467, 179.447179),
        new google.maps.LatLng(-20.549061, 300.422975),
        new google.maps.LatLng(57.497622, 270.396110),
        new google.maps.LatLng(2.517683, 122.394393),
        new google.maps.LatLng(37.785, 20.447)


      ];

      var markers = [];
      var markerss= [];
      var iterator = 0;

      var map;

  	  
      function initialize() {
        var mapOptions = {
          zoom: 2,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: berlin
        };
        
        map = new google.maps.Map(document.getElementById('map_canvas'),
                mapOptions);
        fillMarkerss();




        
        
      }
      var makerimg='lala.jpg';
      var makerimg2='lala2.jpg';
      var check2=0;
      function fillMarkerss(){
        for (var i = 0; i < neighborhoods.length; i++){
          console.log('yay');
          markerss.push(new google.maps.Marker({
          position: neighborhoods[i],
          map: map,
          draggable: false,
          animation: google.maps.Animation.DROP,
          visible: false,
          icon: makerimg2,
          zIndex:5
        }));

          markers.push(new google.maps.Marker({
          position: nb2[i],
          map: map,
          draggable: false,
          animation: google.maps.Animation.DROP,
          visible: false,
          icon: makerimg,
          zIndex:6
        }));


          google.maps.event.addListener(markerss[i], 'mouseover', playMarker);
          google.maps.event.addListener(markerss[i], 'mouseout', playMarker1);
          //google.maps.event.addListener(markerss[i], 'click', playMarker2);
          google.maps.event.addListener(markers[i], 'mouseover', playMarker);
          google.maps.event.addListener(markers[i], 'mouseout', playMarker1);
        }
      }
      var infowindow=[];
      var contentString =  '<div >' +'<img src="tbird.png" width="50px" height="50px" border-style="solid"/>'+'<p>hiii</p>'+'</div>';

      


      function playMarker(event) {


        console.log(this.latLng);

        var check=0;
        console.log(event.latLng['Xa']+10);
        event.latLng['Xa']+=10;
       
        for (var j = infowindow.length - 1; j >= 0; j--) {
          if (infowindow[j].getPosition()==event.latLng) {check=1};
        }
        if (check==0){
          infowindow.push(new google.maps.InfoWindow({
          content: contentString,
          position: event.latLng,
          disableAutoPan: true
          }));


          infowindow[infowindow.length-1].open(map);
          map.setCenter(berlin);
          event.latLng['Xa']-=10;
        };
      }

      function playMarker1(event) {
        console.log(this.position);
        console.log(event.latLng);
        for (var j = infowindow.length - 1; j >= 0; j--) {
          if (infowindow[j].getPosition()==this.position) {console.log('yay');infowindow[j].close(map);infowindow.splice(j,1);};
        }
        // for (var j = infowindow.length - 1; j >= 0; j--) {
        //   infowindow[j].open(map);
        // }
        
      }
      
      function drop() {
        
        


          for (var i = 0; i < neighborhoods.length; i++) {


          setTimeout(function() {            
            addMarker();
            addPath();
            
            
            }, i * 200);
            if (i==neighborhoods.length-1){animateCircle();}
          }
        iterator=0;
        console.log('out side set time for '+iterator);
        
       

        

       


      }
      var addmark=0;
      function addMarker() {
        // markers.push(new google.maps.Marker({
        //   position: neighborhoods[iterator],
        //   map: map,
        //   draggable: false,
        //   animation: google.maps.Animation.DROP,
        //   zIndex:4,
        //   visible:false
        // }));
        addmark++;
        if(addmark<=neighborhoods.length){
          
          markerss[iterator].setVisible(true);
        }
        else{
          console.log(check2);
          markers[iterator].setVisible(true);
        }
      

      }




      var pathCoords=[];
      var pathCoords2=[];
      var pathss;
      var pathss2;
      var addmark2=0;
      var lineSymbol = { 
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 3
           };
      var lineSymbol2 = { 
          path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
          scale: 5
           };
      function addPath() {
        addmark2++;
        if(addmark2<=neighborhoods.length){

      	pathCoords.push(neighborhoods[iterator]);
        if (iterator==0) {pathss = new google.maps.Polyline({
          path: pathCoords,
          strokeColor: "blue",
          strokeOpacity: 0.8,
 
          strokeWeight: 1,
          icons: [{
                icon: lineSymbol
                 }]

          
        });}

          else{
            pathss = new google.maps.Polyline({
          path: pathCoords,
          strokeColor: "blue",
          strokeOpacity: 0.8,
 
          strokeWeight: 1,
         icons: [{
                icon: lineSymbol2
                 }]
          
        });
          }
      	
      
      	pathss.setMap(map);
        
        console.log('in add Path :iterator '+iterator);
        animateCircle();
       	iterator++;

        }
        else{
          pathCoords2.push(nb2[iterator]);

          pathss2 = new google.maps.Polyline({
          path: pathCoords2,
          strokeColor: "red",
          strokeOpacity: 0.8,
 
          strokeWeight: 1,
          icons: [{
                icon: lineSymbol2
                 }]
          
        });

        pathss2.setMap(map);

        iterator++;
        } 
      }

      function animateCircle() {
        
        var count = 0;
 
          
            offsetId = window.setInterval(function() {
            count = (count + 1) % 200;
            var icons = pathss.get('icons');
            icons[0].offset = (count / 2) + '%';
            pathss.set('icons', icons);
            var icons2 = pathss2.get('icons');
            icons2[0].offset = (count / 2) + '%';
            pathss2.set('icons', icons2);
            
            
            }, 20);
          

      }



