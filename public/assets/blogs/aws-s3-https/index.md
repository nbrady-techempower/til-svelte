This walk through will help you set up your S3 static website with SSL/TLS.
We're going to assume you've already set up an S3 bucket for
static website hosting. If you haven't done that part yet, check
out the [AWS Documentation](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html).

This post also assumes you're doing DNS through Route 53, but this can
still be done easily if you're using another provider.

### Create a certificate

First thing you're going to want to do is create a certificate in the
[AWS Certificate Manager (ACM)](https://console.aws.amazon.com/acm/home?region=us-east-1#/wizard/).
Yes, this is in region `us-east-1` and that's fine. It's used across all regions.

For this site, I created a wildcard certificate as I may want to use it with other
sites later.

![create certificate with ACM](/assets/blogs/aws-s3-https/acm-create.png)

Click `Next` and then select `DNS validation` and click `Review`.

Make sure everything looks right and click `Confirm and Request`.

On the screen you'll see some DNS configuration and that your request is pending.
AWS needs to confirm that you own the domain, and will do so by making a request
to the host in this configuration. Mine looked something like
`_62f57asd3310asd342342ea31cd44bc39233.evermoredev.com`

### Configure with Route 53

Head over to your [Route 53 hosted zones](https://console.aws.amazon.com/route53/home?region=us-east-1#hosted-zones:)
and click on the domain name you're setting this up for.

Click `Create Record Set` and enter the information from the DNS configuration
you were just given with the `CNAME` type. `Alias` is no and the value is the
`acm-validation.aws.` value they gave you under `Record value`.

After you've completed this properly, go back the your certificate manager and
make sure the status for your request is now `ISSUED`. Don't worry, this may take
several minutes. Go make yourself a grilled cheese sandwich and it should be done
by the time you get back. **Don't move on until the certificate is issued**

### Create CloudFront Distribution

Now that you have your certificate, head over to the
[CloudFront Dashboard](https://console.aws.amazon.com/cloudfront/home) and
click `Create Distribution` and choose the `Web` distribution. In the origin
settings, set your origin domain name to your S3 domain. **Make sure you don't choose the REST
API endpoint for your bucket in the dropdown.** You'll need to type in the
web endpoint for your bucket. It should be in this format:
`bucket-name.s3-website-us-east-1.amazonaws.com`. So, mine was
`til.evermoredev.s3-website-us-west-2.amazonaws.com`. All the other default
settings are fine until you get to `Distribution Settings`. In the
`Alternate Domain Names (CNAMEs)` input type in the destination for your
website. For me, this was `til.evermoredev.com`. Choose
`Custom SSL Certificate` and the certificate we just set up should be in
the dropdown. If it's not, make sure to go back to the certificate steps
and make sure you completed everything properly. 

Now click `Create Distribution`.

Back in the CloudFront distributions you should see that your Status is currently
`In Progress`. We'll need to wait a few minutes for this to say `Deployed`.
While you're waiting, just make sure that everything in this distribution is
correct:

 * Delivery Method: `Web`
 * Origin: Make sure this is your S3 buckets web endpoint in the correct region
 like `til.evermoredev.s3-website-us-west-2.amazonaws.com`
 * CNAME: The site you're setting the certificate for like `www.myblog.com`

Once the Status is `Deployed` test that the CloudFront endpoint works properly
by hitting it in your browser. If it's showing your site correctly, let's move
on to the last step.

### Back to Route 53

Finally, we need one more Route 53 entry to point your website's URL to the
CloudFront distribution. Click `Create Record Set` in the correct hosted zone
and set up another `CNAME` record. It should look something like this:

![S3 CloudFront Record Set](/assets/blogs/aws-s3-https/s3-cloudfront-record.png)

Allow a few minutes for DNS propagation and soon your S3 hosted website should
be available over HTTPS!

### Disclaimer

As with all things AWS, be sure to check the pricing guides. Unless you plan on
tons of traffic and lots of data coming through CloudFront, you're probably within
the free tier, but I've been burned before so always double check.

### A Little Extra

I've been using SSL and TLS interchangeably and, of course, they're not the same.
TLS (Transport Layer Security) was supposed to supersede SSL (Secure Socket Layer),
but this is the interwebs and it seems nothing really goes according to plan. Most
certificates handle both protocols but there are still a large number of browsers
in use that don't support the latest versions of TLS.

![Rick and Morty Robot's Purpose is sad](/assets/blogs/aws-s3-https/rick-morty-ie.jpeg)

