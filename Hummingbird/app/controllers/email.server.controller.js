'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('y6EIYNIwNBbIaneTap-iXw');
/**
 * Create a Email
 */
exports.emailNotification = function(req, res) {
	var message = {
	    "html": "<p>Example HTML content</p>",
	    "text": "Example text content",
	    "subject": "example subject",
	    "from_email": "sltalty@gmail.com",
	    "from_name": "Example Name",
	    "to": [{
	            "email": "sltclss@gmail.com",
	            "name": "Recipient Name",
	            "type": "to"
	        }],
	    "headers": {
	        "Reply-To": "sltalty@gmail.com"
	    }/*,
	    "important": false,
	    "track_opens": null,
	    "track_clicks": null,
	    "auto_text": null,
	    "auto_html": null,
	    "inline_css": null,
	    "url_strip_qs": null,
	    "preserve_recipients": null,
	    "view_content_link": null,
	    "bcc_address": "sltclss@gmail.com",
	    "tracking_domain": null,
	    "signing_domain": null,
	    "return_path_domain": null,
	    "merge": true,
	    "merge_language": "mailchimp",
	    "global_merge_vars": [{
	            "name": "merge1",
	            "content": "merge1 content"
	        }],
	    "merge_vars": [{
	            "rcpt": "sltclss@gmail.com",
	            "vars": [{
	                    "name": "merge2",
	                    "content": "merge2 content"
	                }]
	        }],
	    "tags": [
	        "password-resets"
	    ],
	    "subaccount": "customer-123",
	    "google_analytics_domains": [
	        "example.com"
	    ],
	    "google_analytics_campaign": "sltalty@gmail.com",
	    "metadata": {
	        "website": "www.example.com"
	    },
	    "recipient_metadata": [{
	            "rcpt": "sltclss@gmail.com",
	            "values": {
	                "user_id": 123456
	            }
	        }],
	    "attachments": [{
	            "type": "text/plain",
	            "name": "myfile.txt",
	            "content": "ZXhhbXBsZSBmaWxl"
	        }],
	    "images": [{
	            "type": "image/png",
	            "name": "IMAGECID",
	            "content": "ZXhhbXBsZSBmaWxl"
	        }]*/
	};
	var async = true;
	var ip_pool = "587";
	mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
	    console.log(result);
	    /*
	    [{
	            "email": "recipient.email@example.com",
	            "status": "sent",
	            "reject_reason": "hard-bounce",
	            "_id": "abc123abc123abc123abc123abc123"
	        }]
	    */
	    return;
	}, function(e) {
	    // Mandrill returns the error as an object with name and message keys
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
	});
};
