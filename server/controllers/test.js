function countMe(uniqueCount) {
    var map = new Object();
    for (var i = 0; i < uniqueCount.length; i++) {
        if (map[uniqueCount[i]] != null) {
            map[uniqueCount[i]] += 1;
        } else {
            map[uniqueCount[i]] = 1;
        }
    }
    return map
}
console.log(countMe(['a', 'b', 'c', 'd', 'd', 'e', 'a', 'b', 'c', 'f', 'g', 'h', 'h', 'h', 'e', 'a']));