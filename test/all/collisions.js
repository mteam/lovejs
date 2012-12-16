var expect = require('expect.js'),
    SpatialHash = require('../../lib/collisions/spatial_hash'),
    rect = require('../../lib/rect');

describe('love.collisions', function() {
  
  describe('SpatialHash', function() {
    
    describe('#min/max', function() {
      
      var hash = new SpatialHash(50);
      
      var results = [
        [0, 0, -1],
        [25, 0, 0],
        [50, 1, 0],
        [75, 1, 1],
        [100, 2, 1],
        
        [0.1, 0, 0],
        [25.123, 0, 0],
        [100.123, 2, 2],
        
        [-0.1, -1, -1],
        [-25, -1, -1],
        [-50, -1, -2],
        [-50.123, -2, -2]
      ];
      
      it('should work correctly', function() {
        results.forEach(function(pair) {

          if (hash.min(pair[0]) != pair[1])
            throw new Error('min for ' + pair[0] + ' is not ' + pair[1]);

          if (hash.max(pair[0]) != pair[2])
            throw new Error('max for ' + pair[0] + ' is not ' + pair[2]);

        });
      });
      
    });

    describe('#insert', function() {

      it('should insert rect that fits in one cell', function() {
        var obj = { rect: rect(10, 10, 30, 30) },
            sh = new SpatialHash(50);

        sh.insert(obj);

        expect(sh.hash).to.only.have.keys('0;0');
      });

      it('should insert rect that fills one cell', function() {
        var sh = new SpatialHash(50),
            obj = { rect: rect(0, 0, 50, 50) };

        sh.insert(obj);

        expect(sh.hash).to.only.have.keys('0;0');
      });

      it('should insert rect that fits in two cells', function() {
        var sh = new SpatialHash(50),
            obj = { rect: rect(10, 10, 80, 30) };

        sh.insert(obj);

        expect(sh.hash).to.only.have.keys('0;0', '1;0');
      });

      it('should insert rect that fills two cells', function() {
        var sh = new SpatialHash(50),
            obj = { rect: rect(0, 0, 50, 100) };

        sh.insert(obj);

        expect(sh.hash).to.only.have.keys('0;0', '0;1');
      });

      it('should insert rect that is partly in the negative coords', function() {
        var sh = new SpatialHash(50),
            obj = { rect: rect(-50, -50, 100, 100) };

        sh.insert(obj);

        expect(sh.hash).to.only.have.keys('-1;-1', '0;-1', '-1;0', '0;0');
      });

      it('should insert rect with decimal coordinates', function() {
        var sh = new SpatialHash(50),
            obj = { rect: rect(20.123, 20.123, 30, 30) };

        sh.insert(obj);

        expect(sh.hash).to.only.have.keys('0;0', '1;0', '0;1', '1;1');
      });

      it('should insert two rects that overlap', function() {
        var sh = new SpatialHash(50),
            obj1 = { rect: rect(10, 10, 80, 30) },
            obj2 = { rect: rect(60, 10, 30, 80) };
				
				sh.insert(obj1);
				sh.insert(obj2);

				expect(sh.hash).to.only.have.keys('0;0', '1;0', '1;1');
				expect(sh.cell(1, 0)).to.have.length(2);
      });

    });

    describe('#reset', function() {

      it('should reset hash', function() {
        var sh = new SpatialHash(50),
            obj1 = { rect: rect(10, 10, 80, 30) },
            obj2 = { rect: rect(60, 10, 30, 80) };
        
        sh.insert(obj1);
        sh.insert(obj2);

        sh.reset();

        for (var key in sh.hash) {
          expect(sh.hash[key]).to.be.empty();
        }
      });

    });
    
  });
  
});
