public with sharing class DemoController {
    public static final String APP_VERSION = '1.0.0';
    /**
     * An empty constructor for the testing
     */
    public DemoController() {}

    /**
     * Get the version of the SFDX demo app
     */
    public String getAppVersion() {
        return APP_VERSION;
    }
}
