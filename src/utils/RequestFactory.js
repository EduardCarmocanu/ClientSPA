class RequestFactory {
	url = "https://givskud-staff-dashboard.azurewebsites.net/api/";
	configuration = {
		"Content-Type": "application/json"
	};
	
	GET = (controller, id = "", callback = () => { return null }) => {
		var xmlHttpRequest = new XMLHttpRequest();
		
		xmlHttpRequest.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				if (this.responseText) {
					callback(JSON.parse(this.responseText));
				}
				else {
					return null;
				}
			}
		}
		xmlHttpRequest.open("GET", this.url + controller + "/" + id, true);
		this.ConfigureRequest(xmlHttpRequest, this.configuration);
		xmlHttpRequest.send();
	}

	ConfigureRequest = (xmlHttpRequest, configuration) => {
		Object.keys(configuration).forEach(key => {
			xmlHttpRequest.setRequestHeader(key, configuration[key]);
		})
	}
}

export default new RequestFactory();