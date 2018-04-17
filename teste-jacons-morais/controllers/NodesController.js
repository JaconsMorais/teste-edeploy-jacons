module.exports = NodesController;

function NodesController(nodes, modifyAlg){
	var begin = nodes[0]
	,		end = nodes[nodes.length - 1]
	,		i = 0
	,		distance = 0
	,		path = begin.name;

	function scanNode(nodes, node){
			var links = node.nodes
			, 	min = Number.MAX_SAFE_INTEGER
			,		shortLink
			,		i = 0
			,		cost_per_link = Number.MAX_SAFE_INTEGER;

			if(node.name == end.name)
				return path;

			if(modifyAlg){	//método guloso considerando média de custo/aresta
				links.forEach((link, l) => {
					var cost = link.distance/(link.name.charCodeAt() - node.name.charCodeAt())
					if(cost < cost_per_link){		//aqui onde é escolhido qual nó será expandido
						min = link.distance;
						i = l;
					}
				});
			}
			else{	//método guloso padrão
				links.forEach((link, l) => {
					if(link.distance < min && link.name > node.name){		//aqui onde é escolhido qual nó será expandido
						min = link.distance;
						i = l;
					}
				});
			}
			distance += links[i].distance;
			i = links[i].name;
			nodes.forEach((node, n) => {
				if(node.name == i)
					shortLink = node;
			});
			path += shortLink.name;
			path = scanNode(nodes, shortLink);
			return path;
	}

	scanNode(nodes, begin);

	return {path, distance};
}
