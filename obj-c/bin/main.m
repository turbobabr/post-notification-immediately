//
//  main.m
//
//  Created by Andrey on 12/5/18.
//  Copyright © 2018 Turbobabr. All rights reserved.
//

#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        
        @try {
            NSString* descriptorStr = [NSString stringWithUTF8String:argv[1]];
            NSData* data = [descriptorStr dataUsingEncoding:NSUTF8StringEncoding];
            
            NSError* err;
            NSDictionary* json = [NSJSONSerialization JSONObjectWithData:data options:0 error:&err];
            if(err != nil) {
                fprintf(stderr, "%s",[NSString stringWithFormat:@"%@",err].UTF8String);
                return 1;
            }
            
            [[NSDistributedNotificationCenter defaultCenter] postNotificationName:json[@"name"] object:nil userInfo:json[@"payload"] deliverImmediately:YES];
        } @catch (NSException *exception) {
            NSString* exceptionDesc = [NSString stringWithFormat:@"%@: %@",exception.name,exception.reason];
            fprintf(stderr, "%s",exceptionDesc.UTF8String);
            
            return 1;
        }
    }
    
    return 0;
}
